import User from '../../../mongo/models/user'; // Assurez-vous que le chemin vers votre modèle est correct
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import clc from 'cli-color';
import { Console } from 'console';

const createDefaultAdmin = async () => {
    try {
        // Vérifiez s'il existe un administrateur dans la base de données
        const existingAdmin = await User.findOne({ admin: true });

        // S'il n'y a aucun administrateur, en créer un par défaut
        if (!existingAdmin) {
            const defaultAdminUser = uuidv4();
            const plainPassword = uuidv4();
            const hashedPassword = await bcrypt.hash(plainPassword, 10);

            const newAdmin = new User({
                user: defaultAdminUser,
                password: hashedPassword,
                mail: `${defaultAdminUser}@example.com`,
                admin: true
            });

            await newAdmin.save();

            // Affichez les identifiants de l'administrateur par défaut dans la console avec stylisation
            const highlight = clc.bgRedBright.white.bold;
            const boxWidth = 57;
            const boxLine = highlight('+' + '-'.repeat(boxWidth) + '+');
            const emptyLine = highlight('|' + ' '.repeat(boxWidth) + '|');
            const userLine = highlight(`| Username: ${defaultAdminUser.padEnd(boxWidth - 12)} |`);
            const passwordLine = highlight(`| Password: ${plainPassword.padEnd(boxWidth - 12)} |`);
            const emailLine = highlight(`| Email: [USERNAME]@example.com`.padEnd(boxWidth + 1) + '|');

            console.log();
            console.log('[✓]' + clc.cyan(' Default admin created successfully. Here are the credentials save it :\n'));
            console.log(boxLine);
            console.log(emptyLine);
            console.log(userLine);
            console.log(passwordLine);
            console.log(emailLine);
            console.log(emptyLine);
            console.log(boxLine);
        }
    } catch (error) {
        console.error('An error occurred while checking/creating the default admin:', error);
    }
};

export default createDefaultAdmin;
