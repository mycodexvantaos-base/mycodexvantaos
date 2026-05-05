import { NextResponse } from 'next/server';
import { NativeValidationService } from '@/services/native/validation-service';

export async function GET() {
  const validationService = NativeValidationService.getInstance();
  validationService.registerHeartbeat('local-kernel-root');
  const metrics = validationService.getSystemMetrics();

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    status: 'healthy',
    data: metrics
  });
}

export async function POST(req: Request) {
  const { action, nodeId = 'local-kernel-root' } = await req.json().catch(() => ({ action: 'optimize' }));
  const validationService = NativeValidationService.getInstance();
  
  let result;
  switch (action) {
    case 'optimize-ram':
      result = validationService.optimizeRam(nodeId);
      break;
    case 'trigger-bootstrap':
      result = validationService.triggerBootstrap(nodeId);
      break;
    case 'trigger-symbiosis':
      result = validationService.triggerSymbiosis(nodeId);
      break;
    case 'trigger-synthesis':
      result = validationService.triggerSynthesis(nodeId);
      break;
    case 'trigger-coverage-test':
      result = validationService.triggerCoverageTest(nodeId);
      break;
    case 'trigger-sovereign-handshake':
      result = validationService.triggerSovereignHandshake(nodeId);
      break;
    default:
      result = validationService.optimizeRam(nodeId);
  }
  
  return NextResponse.json({
    action,
    status: result ? 'success' : 'failed',
    result
  });
}
