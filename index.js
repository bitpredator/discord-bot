// SETUP REQUIREMENTS
// require the discord.js module
const fs = require('fs');
const Discord = require('discord.js');
// require configuration file and passes prefix and token from it
const { prefix, token } = require('./config.json');

// require youtube download (tdl) core
const ytdl = require('ytdl-core');

// create a new Discord client and take commands from commands collection
const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

// READY APPLICATION
// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log('Ready!');
	// Setting bot activity on discord
	client.user.setActivity('!help');
});

// COMMANDS
client.on('message', async message => {
  // if author of message is a bot than ignore
	if (!message.content.startsWith(prefix) || message.author.bot) return;

  // sets guild ID - Guilds are basically the specific servers
	const guild = client.guilds.cache.get("");

  // take command argument and name
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

  // if there is a matching command name in the command collection than return it
	if (!client.commands.has(commandName)) return;

  // handling of commands of higher complexity, with arguments check and error handling (to check)
	const command = client.commands.get(commandName);

	if (command.args && !args.length) {
		return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
  }

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});



// CLIENT LOGIN
client.login(token);
