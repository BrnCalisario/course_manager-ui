/**
 * Represents a command that can be executed.
 */
type ICommand = {
	/**
	 * Executes the command.
	 */
	execute(): void;
};

export default ICommand;
