import { CliCommandAbstract } from './cli-command.abstarct.js';
import { CliCommandInterface } from './cli-command.interface.js';


export class HelpCliCommand extends CliCommandAbstract implements CliCommandInterface {
  public readonly name: string;

  constructor() {
    super();
    this.name = '--help';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    this.logger.info(`
      Программа для подготовки данных для REST API сервера.
      Пример:
          main.js --<command> [--arguments]
      Команды:
          --version:                                                                # выводит номер версии
          --help:                                                                   # печатает этот текст
          --import <path> <username> <password> <db-host> <port> <database-name>:   # импортирует данные из TSV
          --generator <n> <path> <url>                                              # генерирует произвольное количество тестовых данных
    `);
  }

}
