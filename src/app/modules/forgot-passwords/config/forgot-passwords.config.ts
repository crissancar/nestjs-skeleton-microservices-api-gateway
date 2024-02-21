import { config } from '../../../../config/app';
import { SendgridFrom } from '../../shared/mailers/dtos/sendgrid-send-mail-request.dto';
import { forgotPasswordsSwaggerConfig } from './swagger/forgot-passwords-swagger.config';

const { fromEmail, fromName, templates } = config.sendgrid;
const { forgotPassword } = templates;

export const forgotPasswordsConfig = {
	entity: { name: 'forgot_password' },
	globalRoute: 'forgot-passwords',
	swagger: forgotPasswordsSwaggerConfig,
	repository: {
		repositoryInterface: 'ForgotPasswordRepository',
	},
	mailer: {
		mailerInterface: 'ForgotPasswordMailer',
	},
	postController: {
		constants: {
			context: 'ForgotPasswordPostController',
		},
		logs: {
			requestLog: 'Request received to create a new forgot password',
		},
	},
	putController: {
		constants: {
			context: 'ForgotPasswordPutController',
			routes: { complete: ':id' },
			params: { id: 'id' },
		},
		logs: {
			requestLog: 'Request received to update a forgot password',
		},
	},
	creator: {
		constants: {
			context: 'ForgotPasswordCreator',
		},
	},
	completer: {
		constants: {
			context: 'ForgotPasswordCompleter',
		},
	},
	updater: {
		constants: {
			context: 'ForgotPasswordUpdater',
		},
	},
	deleter: {
		constants: {
			context: 'ForgotPasswordDeleter',
		},
		logs: {
			requestLog: 'Running ForgotPasswordDeleter',
			responseLog: (id: string): string => `Forgot password with id <${id}> deleted`,
		},
	},
	finder: {
		constants: {
			context: 'ForgotPasswordFinder',
		},
	},
	typeOrmRepository: {
		constants: {
			context: 'TypeOrmForgotPasswordRepository',
		},
		logs: {
			create: {
				requestLog: 'Persisting forgot password in database',
			},
			find: {
				requestLog: 'Finding forgot password in database',
			},
			delete: {
				requestLog: 'Deleting forgot password from database',
			},
		},
	},
	mailSender: {
		constants: {
			context: 'ForgotPasswordMailSender',
		},
	},
	sendgridMailer: {
		constants: {
			context: 'SendgridForgotPasswordMailer',
			from: {
				name: fromName,
				email: fromEmail,
			} as SendgridFrom,
		},
		logs: {
			created: {
				requestLog: 'Sending created forgot password mail',
			},
		},
		templates: {
			forgotPasswordTemplate: {
				templateId: forgotPassword,
				subject: 'Recuperación de contraseña',
				message: 'Tenemos una petición para recuperar tu contraseña',
			},
		},
	},
};
