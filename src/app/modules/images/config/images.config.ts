import { fit, strategy } from 'sharp';

import { imagesSwaggerConfig } from './swagger/images-swagger.config';

export const imagesConfig = {
	entity: { name: 'image' },
	globalRoute: 'images',
	swagger: imagesSwaggerConfig,
	repository: {
		repositoryInterface: 'ImageRepository',
	},
	postController: {
		constants: {
			context: 'ImagePostController',
		},
		logs: {
			requestLog: 'Request received to create a new image',
		},
	},
	getController: {
		constants: {
			context: 'ImageGetController',
			routes: { findById: ':id', delete: ':id' },
			params: { id: 'id' },
		},
		logs: {
			findById: {
				requestLog: 'Request received to find image by id',
			},
			findByCriteria: {
				requestLog: 'Request received to find images by criteria filter',
			},
		},
	},
	deleteController: {
		constants: {
			context: 'ImageDeleteController',
			routes: { delete: ':id' },
			params: { id: 'id' },
		},
		logs: {
			requestLog: 'Request received to delete image',
		},
	},
	creator: {
		constants: {
			context: 'ImageCreator',
		},
	},
	deleter: {
		constants: {
			context: 'ImageDeleter',
		},
		logs: {
			requestLog: 'Running ImageDeleter',
			responseLog: (id: string): string => `Image <${id}> deleted`,
		},
	},
	thumbnailsCreator: {
		constants: {
			context: 'ImageThumbnailsCreator',
		},
		logs: {
			requestLog: 'Running ImageThumbnailsCreator',
			responseLog: (name: string): string => `Thumbnails to image <${name}> created`,
		},
	},
	finderById: {
		constants: {
			context: 'ImageFinderById',
		},
		logs: {
			requestLog: 'Running ImageFinderById',
			responseLog: (id: string): string => `Image with id <${id}> found`,
		},
	},
	finderByCriteria: {
		constants: {
			context: 'ImagesFinderByCriteria',
		},
		logs: {
			requestLog: 'Running ImagesFinderByCriteria',
		},
	},
	typeOrmRepository: {
		constants: {
			context: 'TypeOrmImageRepository',
		},
		logs: {
			create: {
				requestLog: 'Persisting image in database',
			},
			findById: {
				requestLog: 'Finding image by id in database',
			},
			findByCriteria: {
				requestLog: 'Finding image by criteria filter in database',
			},
			delete: {
				requestLog: 'Deleting image from database',
			},
		},
	},

	imagesPath: 'images',
	upload: {
		path: '/artifacts/tmp/',
		size: 10485760,
	},
	acceptedMimeTypes: [
		'image/jpeg',
		'image/pjpeg',
		'image/png',
		'image/bmp',
		'image/x-windows-bmp',
		'image/gif',
	],
	available: {
		profiles: ['default'],
	},
	profiles: {
		default: {
			webp: {
				format: 'webp',
				autoOrient: true,
				greyscale: true,
				resize: {
					width: '100%',
					height: '100%',
					fit: fit.cover,
					position: strategy.entropy,
				},
			},
			original: {
				autoOrient: true,
				greyscale: true,
				resize: {
					width: '100%',
					height: '100%',
					fit: fit.cover,
					position: strategy.entropy,
				},
			},
		},
	},
};
