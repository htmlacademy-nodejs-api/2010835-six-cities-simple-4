import { CliCommandInterface } from './cli-command.interface';


export class HelpCliCommand implements CliCommandInterface {
  public readonly name: string;

  constructor() {
    this.name = '--help';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    console.log(`
      Программа для подготовки данных для REST API сервера.
      Пример:
          main.js --<command> [--arguments]
      Команды:
          --version:                   # выводит номер версии
          --help:                      # печатает этот текст
          --import <path>:             # импортирует данные из TSV
          --generator <n> <path> <url> # генерирует произвольное количество тестовых данных
    `);
  }

}
