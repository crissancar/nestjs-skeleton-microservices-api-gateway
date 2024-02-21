import { sharedPropertiesSwagger } from '../../../../shared/config/swagger/shared-properties.swagger';

export const imagePropertiesSwagger = {
	...sharedPropertiesSwagger,
	image: {
		name: 'image',
		required: true,
		type: String,
		format: 'binary',
	},
	name: {
		name: 'name',
		example: 'My image',
		required: false,
		type: String,
	},
	deleteMessage: {
		name: 'message',
		example: 'Image with id <0287a3f4-ecbb-4b36-ba9d-cda63fb6d664> deleted',
		required: false,
		type: String,
	},
	original: {
		example: {
			preset: 'original',
			name: '1678050205106371222151.png',
			publicPath: '/images/2023/3/1678050205106371222151.png',
			fullPath:
				'/home/dev/Code/Kubide/skeleton/skeleton-api/artifacts/public/images/2023/3/1678050205106371222151.png',
			url: 'http://localhost:8081/images/2023/3/1678050205106371222151.png',
			width: 336,
			height: 336,
			size: 0,
			format: 'png',
		},
		required: true,
	},
	thumbnails: {
		example: {
			webp: {
				url: 'http://localhost:8081/images/2023/3/1678050205106371222151.webp.webp',
				name: '1678050205106371222151.webp.webp',
				size: 2094,
				width: 100,
				format: 'webp',
				height: 100,
				preset: 'webp',
				fullPath:
					'/home/dev/Code/Kubide/skeleton/skeleton-api/artifacts/public/images/2023/3/1678050205106371222151.webp.webp',
				publicPath: '/images/2023/3/1678050205106371222151.webp.webp',
			},
			original: {
				url: 'http://localhost:8081/images/2023/3/1678050205106371222151.original.png',
				name: '1678050205106371222151.original.png',
				size: 5948,
				width: 100,
				format: 'png',
				height: 100,
				preset: 'original',
				fullPath:
					'/home/dev/Code/Kubide/skeleton/skeleton-api/artifacts/public/images/2023/3/1678050205106371222151.original.png',
				publicPath: '/images/2023/3/1678050205106371222151.original.png',
			},
		},
		required: true,
	},
	imagesCriteria: {
		example: [
			{
				id: '2333a85c-16a8-4985-8780-8ebf041f5852',
				name: 'Image name',
				original: {
					preset: 'original',
					name: '1678050205106371222151.png',
					publicPath: '/images/2023/3/1678050205106371222151.png',
					fullPath:
						'/home/dev/Code/Kubide/skeleton/skeleton-api/artifacts/public/images/2023/3/1678050205106371222151.png',
					url: 'http://localhost:8081/images/2023/3/1678050205106371222151.png',
					width: 336,
					height: 336,
					size: 0,
					format: 'png',
				},
				thumbnails: {
					webp: {
						url: 'http://localhost:8081/images/2023/3/1678050205106371222151.webp.webp',
						name: '1678050205106371222151.webp.webp',
						size: 2094,
						width: 100,
						format: 'webp',
						height: 100,
						preset: 'webp',
						fullPath:
							'/home/dev/Code/Kubide/skeleton/skeleton-api/artifacts/public/images/2023/3/1678050205106371222151.webp.webp',
						publicPath: '/images/2023/3/1678050205106371222151.webp.webp',
					},
					original: {
						url: 'http://localhost:8081/images/2023/3/1678050205106371222151.original.png',
						name: '1678050205106371222151.original.png',
						size: 5948,
						width: 100,
						format: 'png',
						height: 100,
						preset: 'original',
						fullPath:
							'/home/dev/Code/Kubide/skeleton/skeleton-api/artifacts/public/images/2023/3/1678050205106371222151.original.png',
						publicPath: '/images/2023/3/1678050205106371222151.original.png',
					},
				},
			},
			{
				id: 'fda1c553-8de6-460e-b78d-4e99ca0ed0e9',
				name: 'Image name',
				original: {
					preset: 'original',
					name: '1678048454086297853093.png',
					publicPath: '/images/2023/3/1678048454086297853093.png',
					fullPath:
						'/home/dev/Code/Kubide/skeleton/skeleton-api/artifacts/public/images/2023/3/1678048454086297853093.png',
					url: 'http://localhost:8081/images/2023/3/1678048454086297853093.png',
					width: 336,
					height: 336,
					size: 0,
					format: 'png',
				},
				thumbnails: {
					webp: {
						url: 'http://localhost:8081/images/2023/3/1678048454086297853093.webp.webp',
						name: '1678048454086297853093.webp.webp',
						size: 2094,
						width: 100,
						format: 'webp',
						height: 100,
						preset: 'webp',
						fullPath:
							'/home/dev/Code/Kubide/skeleton/skeleton-api/artifacts/public/images/2023/3/1678048454086297853093.webp.webp',
						publicPath: '/images/2023/3/1678048454086297853093.webp.webp',
					},
					original: {
						url: 'http://localhost:8081/images/2023/3/1678048454086297853093.original.png',
						name: '1678048454086297853093.original.png',
						size: 5948,
						width: 100,
						format: 'png',
						height: 100,
						preset: 'original',
						fullPath:
							'/home/dev/Code/Kubide/skeleton/skeleton-api/artifacts/public/images/2023/3/1678048454086297853093.original.png',
						publicPath: '/images/2023/3/1678048454086297853093.original.png',
					},
				},
			},
		],
	},
};
