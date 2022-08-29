// CREATE INVITE TO THE DISCORD
module.exports = {
    name: 'invite',
    description: 'create the discord invite for your server',
    async execute (message) {
      message.react('👋');
      let invite = await message.channel.createInvite({maxAge: 0});
      message.channel.send(`${invite}`);
  }
}
