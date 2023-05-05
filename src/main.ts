import { CliApplication } from './app/cli-application.js';
import process from 'node:process';
import { HelpCliCommand } from './core/cli-comands/help-command.js';
import VersionCommand from './core/cli-comands/version-command.js';


const cliApp = new CliApplication();

cliApp.registerCommands([new HelpCliCommand(), new VersionCommand()]);

cliApp.processCommand(process.argv);
