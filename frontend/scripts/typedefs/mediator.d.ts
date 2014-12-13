declare class Mediator {
  subscribe(channel: string, callback: (...args: any[]) => any, options?: any, context?: any);
  publish(channel: string, ...data: any[]);
  remove(channel: string, identifier?: string);
}
