declare module 'sql-ddl-to-json-schema' {
  const Parser: {
    new (type: string): any;
    feed(sql: string): any;
  };
  export = Parser;
}
