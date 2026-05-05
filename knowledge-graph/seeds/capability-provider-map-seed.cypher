// knowledge-graph/seeds/capability-provider-map-seed.cypher
// Initial capability→provider mappings

CREATE (:Provider {id: 'database-postgres',    capability: 'database',     providerName: 'postgres'})
CREATE (:Provider {id: 'vector-store-pgvector',capability: 'vector-store', providerName: 'pgvector'})
CREATE (:Provider {id: 'llm-openai',           capability: 'llm',          providerName: 'openai'})
CREATE (:Provider {id: 'embedding-openai',     capability: 'embedding',    providerName: 'openai'})
CREATE (:Provider {id: 'cache-redis',          capability: 'cache',        providerName: 'redis'})

MATCH (p:Provider {id: 'database-postgres'}),    (c:Capability {id: 'database'})
CREATE (p)-[:PROVIDES_CAPABILITY]->(c)
MATCH (p:Provider {id: 'vector-store-pgvector'}),(c:Capability {id: 'vector-store'})
CREATE (p)-[:PROVIDES_CAPABILITY]->(c)
MATCH (p:Provider {id: 'llm-openai'}),           (c:Capability {id: 'llm'})
CREATE (p)-[:PROVIDES_CAPABILITY]->(c)
