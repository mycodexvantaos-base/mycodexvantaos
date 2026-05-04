// knowledge-graph/seeds/core-services-seed.cypher
// Initial graph seed: core service nodes and capability relationships

CREATE (:Service {id: 'mycodexvantaos-core-kernel',  domain: 'core',     lifecycle: 'stable'})
CREATE (:Service {id: 'mycodexvantaos-core-auth',    domain: 'core',     lifecycle: 'stable'})
CREATE (:Service {id: 'mycodexvantaos-core-gateway', domain: 'core',     lifecycle: 'stable'})
CREATE (:Service {id: 'mycodexvantaos-ai-embedding', domain: 'ai',       lifecycle: 'stable'})
CREATE (:Service {id: 'mycodexvantaos-ai-llm',       domain: 'ai',       lifecycle: 'stable'})
CREATE (:Service {id: 'mycodexvantaos-ai-memory',    domain: 'ai',       lifecycle: 'stable'})
CREATE (:Service {id: 'mycodexvantaos-data-vector-store', domain: 'data',lifecycle: 'stable'})

CREATE (:Capability {id: 'database'}),   (:Capability {id: 'embedding'}),
       (:Capability {id: 'llm'}),        (:Capability {id: 'vector-store'}),
       (:Capability {id: 'cache'}),      (:Capability {id: 'auth'}),
       (:Capability {id: 'observability'})

MATCH (s:Service {id: 'mycodexvantaos-ai-embedding'}), (c:Capability {id: 'embedding'})
CREATE (s)-[:IMPLEMENTS]->(c)
MATCH (s:Service {id: 'mycodexvantaos-ai-llm'}), (c:Capability {id: 'llm'})
CREATE (s)-[:IMPLEMENTS]->(c)
