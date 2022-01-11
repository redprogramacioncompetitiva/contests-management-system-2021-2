
import {sgMail} from 'sendgrid';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);


class User {
	constructor(email, password, nickname, firstName, lastName, country, verified) {
		this.email = email;
		this.password = password;
		this.nickname = nickname;
		this.firstName = firstName;
		this.lastName = lastName;
		this.country = country;
		this.verified = verified;
	}
}

class Venue {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

class Contest {
    constructor(name, InscStartDate, InscStartTime, InscEndDate, InscEndTime, ContStartDate, ContStartTime, ContEndDate, ContEndTime, venues) {
        this.name = name;
        this.InscStartDate = InscStartDate;
        this.InscStartTime = InscStartTime;
        this.InscEndDate = InscEndDate;
        this.InscEndTime = InscEndTime;
        this.ContStartDate = ContStartDate;
        this.ContStartTime = ContStartTime;
        this.ContEndDate = ContEndDate;
        this.ContEndTime = ContEndTime;
        this.venues = venues;
    }
}

class Email {
	constructor(email, url, nickname) {
		this.email = email;
		this.url = url;
		this.nickname = nickname
		this.fromEmail = 'peppapignea@gmail.com';
		this.fromName = 'Peppa Pig';
	}

    async sendEmail() {
		const mailOptions = {
			to: this.email,
			from: {
				email: this.fromEmail,
				name: this.fromName,
			},
			templateId: 'd-38484195aa134e15ad3d22d2311acc30',
			dynamic_template_data: {
				url_act: this.url,
				name: this.nickname,
				subject: 'Activa tu cuenta',
			},
		};
		await sgMail.send(mailOptions).then(() => {
		}, console.error);
	}
};

class Email3 {
	constructor(email, code, nickname) {
		this.email = email;
		this.code = code;
		this.nickname = nickname
		this.fromEmail = 'peppapignea@gmail.com';
		this.fromName = 'Peppa Pig';
	}

	async sendCodeEmail() {
		const mailOptions = {
			to: this.email,
			from: {
				email: this.fromEmail,
				name: this.fromName,
			},
			templateId: 'd-8305600dff364783802a7c1fcba1dd4e',
			dynamic_template_data: {
				url_act: this.url,
				name: "ander",
				subject: 'Activa tu cuenta',
            },
		};
		await sgMail.send(mailOptions).then(() => {
		}, console.error);
	}
};

class Email2 {
    constructor(email, team_Name, members, codeCompetition, start_date, start_hour, end_date, end_hour) {
		this.email = email;
		this.team_Name = team_Name;
        this.members = members;
        this.codeCompetition = codeCompetition;
        this.start_date = start_date;
        this.start_hour = start_hour;
        this.end_date = end_date;
        this.end_hour = end_hour;
		this.fromEmail = 'peppapignea@gmail.com';
		this.fromName = 'Peppa Pig';
	}

    async sendContestEmail() {
		const mailOptions = {
			to: this.email,
			from: {
				email: this.fromEmail,
				name: this.fromName,
			},
			templateId: 'd-223d14ceae144ce9bb6ef61696b8b0d7',
			dynamic_template_data: {
				team_Name: this.team_Name,
                members: this.members,
                codeCompetition: this.codeCompetition,
                start_date: this.start_date,
                start_hour: this.start_hour,
                end_date: this.end_date,
                end_hour: this.end_hour,
				subject: 'Información de competencia',
				name: this.nickname,
                code: this.code,
				subject: 'Recupera tu contraseña',
			},
		};
		await sgMail.send(mailOptions).then(() => {
		}, console.error);
	}
};



class Team {
    constructor(id, name, integrants, userEmail) {
        this.id = id;
        this.name = name;
        this.integrants = integrants;
        this.userEmail = userEmail;
    }
};

class Team_User {
    constructor(idTeam, userEmail) {
        this.idTeam = idTeam;
        this.userEmail = userEmail;
    }
}

export {User,Venue,Contest,Email,Email2,Email3,Team,Team_User}