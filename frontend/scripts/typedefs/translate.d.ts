declare var T: any;

declare var Tmpl: any;

declare var Sortable: any;

declare var Pikaday: any;

interface Pikaday {
  getMoment(): Moment;
}

interface Sortable {
  sort(bywhat?: any): Sortable;
  toArray(): Array<any>;
}

interface JQuery {
  timepicker(bla: any, blubb?: any);
}

interface ISession {
  token: string;
  expires: string;
}
