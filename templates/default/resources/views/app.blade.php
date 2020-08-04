<!DOCTYPE html>
<html class="h-full min-h-screen antialised">
	<head>
		<meta charset="utf-8" />
		<meta
			name="viewport"
			content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
		/>

		<!-- Add Inter -->
		<link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin />
		<link href="https://rsms.me/inter/inter.css" rel="stylesheet" />

		<!-- Register CSS and JS -->
		<link href="{{ mix('/build/app.css') }}" rel="stylesheet" />
		<script src="{{ mix('/build/app.js') }}" defer></script>
	</head>
	<body class="h-full">
		@inertia
	</body>
</html>
