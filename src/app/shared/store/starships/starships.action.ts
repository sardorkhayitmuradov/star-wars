export class StarshipsAction {
  /**
   *
   */
  static readonly type = '[Starships API] GetAll';
  constructor(public pageIndex: number) {}
}
