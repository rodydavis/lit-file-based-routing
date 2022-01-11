export class StringBuilder {
  private _lines: string[] = [];

  write(line: string = ""): void {
    this._lines.push(line);
  }

  writeln(line: string = ""): void {
    this._lines.push(line);
    this._lines.push("\n");
  }

  writeAll(lines: string[]): void {
    lines.push("");
    this._lines.push(lines.join("\n"));
  }

  toString(): string {
    return this._lines.join("");
  }
}
