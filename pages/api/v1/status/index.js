import database from "infra/database.js";
async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const databaseName = process.env.POSTGRES_DB;

  const databaseVersionResult = await database.query("show server_version;");
  const databaseVersionValue = databaseVersionResult.rows[0].server_version;

  const databaseMaxConnectionsResult = await database.query(
    "show max_connections;",
  );
  const databaseMaxConnectionsValue =
    databaseMaxConnectionsResult.rows[0].max_connections;

  const databaseOpenedConnectionsResult = await database.query({
    text: "SELECT count(*)::int AS open_connections FROM pg_stat_activity where datname = $1;",
    values: [databaseName],
  });

  console.log(databaseName);

  const databaseOpenedConnectionsValue =
    databaseOpenedConnectionsResult.rows[0].open_connections;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersionValue,
        max_connections: parseInt(databaseMaxConnectionsValue),
        opened_connections: databaseOpenedConnectionsValue,
      },
    },
  });
}

export default status;
