export type FileLogger = (
  filename: string
) => (
  level: "log" | "info" | "debug" | "error",
  entity: Record<any, any>,
  module_?: Record<any, any>
) => void;

export const ctxLogger = (ctx: any) => {
  return (filename: string) => {
    return (
      level: "log" | "info" | "debug" | "error",
      entity: Record<any, any>,
      module_: Record<any, any> = {}
    ) => {
      console[level](
        JSON.stringify({
          timestamp: new Date().toISOString(),
          level,
          ctx: {
            // todo: gql query name
            user: ctx.user,
          },
          entity,
          module: {
            ...module_,
            filename,
          },
        })
      );
    };
  };
};
