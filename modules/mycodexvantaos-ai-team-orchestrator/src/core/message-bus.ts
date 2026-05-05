/**
 * MessageBus - Pub/Sub event-driven message bus for agent communication
 * @module @mycodexvantaos/ai-team-orchestrator/core
 */

import EventEmitter from 'eventemitter3';
import type {
  AgentMessage,
  AgentURN,
  MessageURN,
  MessageType,
  MessagePriority,
  OrchestratorEventType,
  OrchestratorEvent,
  ToolCall,
  ToolResult,
} from '../types';
import { v4 as uuidv4 } from 'uuid';

/**
 * Message handler function type
 */
export type MessageHandler = (message: AgentMessage) => void | Promise<void>;

/**
 * Event handler function type
 */
export type EventHandler = (data: unknown) => void;

/**
 * Queued message entry
 */
interface QueuedMessage {
  message: AgentMessage;
  retries: number;
  timestamp: number;
}

/**
 * Message bus statistics
 */
export interface MessageBusStats {
  messagesSent: number;
  messagesDelivered: number;
  messagesFailed: number;
  activeSubscriptions: number;
  queueSize: number;
}

/**
 * Message bus configuration
 */
export interface MessageBusConfig {
  maxQueueSize?: number;
  maxRetries?: number;
  messageTimeoutMs?: number;
  retryDelayMs?: number;
}

const DEFAULT_CONFIG: Required<MessageBusConfig> = {
  maxQueueSize: 1000,
  maxRetries: 3,
  messageTimeoutMs: 300000, // 5 minutes
  retryDelayMs: 1000, // 1 second
};

/**
 * MessageBus class
 * Provides pub/sub messaging for agent communication
 */
export class MessageBus {
  private messageQueue: Map<AgentURN, QueuedMessage[]> = new Map();
  private subscriptions: Map<AgentURN, Set<MessageHandler>> = new Map();
  private eventEmitter: EventEmitter = new EventEmitter();
  private config: Required<MessageBusConfig>;
  private stats: MessageBusStats = {
    messagesSent: 0,
    messagesDelivered: 0,
    messagesFailed: 0,
    activeSubscriptions: 0,
    queueSize: 0,
  };

  constructor(config?: MessageBusConfig) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  // ============================================================================
  // Event Emitter Proxy
  // ============================================================================

  /**
   * Subscribe to orchestrator events
   */
  public on(event: OrchestratorEventType, listener: (data: unknown) => void): this {
    this.eventEmitter.on(event, listener);
    return this;
  }

  /**
   * Unsubscribe from orchestrator events
   */
  public off(event: OrchestratorEventType, listener: (data: unknown) => void): this {
    this.eventEmitter.off(event, listener);
    return this;
  }

  /**
   * Emit an orchestrator event
   */
  public emit(event: OrchestratorEventType, data: unknown): boolean {
    return this.eventEmitter.emit(event, data);
  }

  // ============================================================================
  // Message Sending
  // ============================================================================

  /**
   * Send a message to a specific agent
   * @param message - The message to send (without id and timestamp)
   * @returns The message URN
   */
  public send(message: Omit<AgentMessage, 'id' | 'timestamp'>): MessageURN {
    const fullMessage: AgentMessage = {
      ...message,
      id: this.generateMessageURN(),
      timestamp: new Date().toISOString(),
    };

    // Queue message if recipient is specified
    if (fullMessage.recipient_id) {
      this.queueMessage(fullMessage);
    }

    // Emit message event
    this.emit('message:sent', {
      message_id: fullMessage.id,
      sender_id: fullMessage.sender_id,
      recipient_id: fullMessage.recipient_id,
      message_type: fullMessage.message_type,
    });

    this.stats.messagesSent++;

    return fullMessage.id;
  }

  /**
   * Broadcast a message to all agents (or filtered by type)
   */
  public broadcast(
    senderId: AgentURN,
    messageType: MessageType,
    content: AgentMessage['content'],
    options?: {
      priority?: MessagePriority;
      context_references?: AgentMessage['context_references'];
    }
  ): MessageURN {
    const message: AgentMessage = {
      id: this.generateMessageURN(),
      sender_id: senderId,
      recipient_id: null, // null indicates broadcast
      message_type: messageType,
      content,
      priority: options?.priority ?? 'normal',
      context_references: options?.context_references,
      timestamp: new Date().toISOString(),
    };

    // Emit broadcast event
    this.emit('message:sent', {
      message_id: message.id,
      sender_id: senderId,
      recipient_id: null,
      message_type: messageType,
      broadcast: true,
    });

    this.stats.messagesSent++;

    return message.id;
  }

  // ============================================================================
  // Subscriptions
  // ============================================================================

  /**
   * Subscribe to messages for a specific agent
   */
  public subscribe(agentId: AgentURN, handler: MessageHandler): string {
    const subscriptionId = uuidv4();

    if (!this.subscriptions.has(agentId)) {
      this.subscriptions.set(agentId, new Set());
    }

    const handlers = this.subscriptions.get(agentId)!;
    handlers.add(handler);
    this.stats.activeSubscriptions++;

    // Process queued messages for this agent
    this.processQueue(agentId, handler);

    return subscriptionId;
  }

  /**
   * Unsubscribe from messages
   */
  public unsubscribe(agentId: AgentURN, handler: MessageHandler): void {
    const handlers = this.subscriptions.get(agentId);
    if (handlers) {
      handlers.delete(handler);
      this.stats.activeSubscriptions--;
    }
  }

  // ============================================================================
  // Tool Calls
  // ============================================================================

  /**
   * Send a tool call message
   */
  public sendToolCall(senderId: AgentURN, toolCall: ToolCall): MessageURN {
    return this.send({
      sender_id: senderId,
      recipient_id: null, // Tool calls are handled by toolkit
      message_type: 'tool_call',
      content: {
        type: 'tool_call',
        data: {
          tool_id: toolCall.tool_id,
          function_name: toolCall.function_name,
        },
      },
      tool_call: toolCall,
      priority: 'high',
      requires_response: true,
    });
  }

  /**
   * Send a tool result message
   */
  public sendToolResult(recipientId: AgentURN, toolResult: ToolResult): MessageURN {
    return this.send({
      sender_id: recipientId, // The recipient of the tool call is the sender of the result
      recipient_id: null,
      message_type: 'tool_result',
      content: {
        type: 'tool_result',
        data: toolResult as unknown as Record<string, unknown>,
      },
      tool_result: toolResult,
      priority: 'high',
    });
  }

  // ============================================================================
  // Orchestrator Events
  // ============================================================================

  /**
   * Publish an orchestrator event
   */
  public publishEvent(event: OrchestratorEvent): void {
    this.emit(event.type, event);
  }

  /**
   * Subscribe to orchestrator events
   */
  public subscribeToEvents(
    eventType: OrchestratorEventType,
    handler: (event: OrchestratorEvent) => void
  ): void {
    this.eventEmitter.on(eventType, handler as (data: unknown) => void);
  }

  /**
   * Unsubscribe from orchestrator events
   */
  public unsubscribeFromEvents(
    eventType: OrchestratorEventType,
    handler: (event: OrchestratorEvent) => void
  ): void {
    this.eventEmitter.off(eventType, handler as (data: unknown) => void);
  }

  // ============================================================================
  // Queue Management
  // ============================================================================

  /**
   * Queue a message for an agent
   */
  private queueMessage(message: AgentMessage): void {
    if (!message.recipient_id) return;

    if (!this.messageQueue.has(message.recipient_id)) {
      this.messageQueue.set(message.recipient_id, []);
    }

    const queue = this.messageQueue.get(message.recipient_id)!;

    // Check queue size limit
    if (queue.length >= this.config.maxQueueSize) {
      // Remove oldest message
      queue.shift();
    }

    queue.push({
      message,
      retries: 0,
      timestamp: Date.now(),
    });

    this.stats.queueSize = this.getTotalQueueSize();

    // Immediately deliver to registered handlers
    const handlers = this.subscriptions.get(message.recipient_id);
    if (handlers && handlers.size > 0) {
      for (const handler of handlers) {
        const result = handler(message);
        if (result instanceof Promise) {
          result.catch(() => {
            // Handler error is logged but doesn't block other handlers
          });
        }
      }
      // Remove from queue after delivery
      queue.pop();
      this.stats.messagesDelivered++;
    }
  }

  /**
   * Process queued messages for an agent
   */
  private async processQueue(agentId: AgentURN, handler: MessageHandler): Promise<void> {
    const queue = this.messageQueue.get(agentId);
    if (!queue || queue.length === 0) return;

    const now = Date.now();

    while (queue.length > 0) {
      const entry = queue[0];

      // Check if message has expired
      if (now - entry.timestamp > this.config.messageTimeoutMs) {
        queue.shift();
        this.stats.messagesFailed++;
        this.emit('message:timeout', {
          message_id: entry.message.id,
          recipient_id: agentId,
        });
        continue;
      }

      try {
        await handler(entry.message);
        queue.shift();
        this.stats.messagesDelivered++;
        this.emit('message:received', {
          message_id: entry.message.id,
          recipient_id: agentId,
        });
      } catch (error) {
        entry.retries++;
        if (entry.retries >= this.config.maxRetries) {
          queue.shift();
          this.stats.messagesFailed++;
          this.emit('message:failed', {
            message_id: entry.message.id,
            recipient_id: agentId,
            error,
          });
        }
      }
    }
  }

  /**
   * Get total queue size across all agents
   */
  private getTotalQueueSize(): number {
    let total = 0;
    for (const queue of this.messageQueue.values()) {
      total += queue.length;
    }
    return total;
  }

  /**
   * Generate a unique message URN
   */
  private generateMessageURN(): MessageURN {
    return `urn:mycodexvantaos:message:${uuidv4()}` as MessageURN;
  }

  /**
   * Delay helper
   */
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Get message bus statistics
   */
  public getStats(): MessageBusStats {
    return { ...this.stats };
  }

  /**
   * Clear all queues and subscriptions
   */
  public clear(): void {
    this.messageQueue.clear();
    this.subscriptions.clear();
    this.eventEmitter.removeAllListeners();
    this.stats = {
      messagesSent: 0,
      messagesDelivered: 0,
      messagesFailed: 0,
      activeSubscriptions: 0,
      queueSize: 0,
    };
  }
}

export default MessageBus;
