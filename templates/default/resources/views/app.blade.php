<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
		<head>
				<meta charset="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link href="{{ mix('/build/app.css') }}" rel="stylesheet" />
    		<script src="{{ mix('/build/app.js') }}" defer></script>
		</head>
		<body>
			@inertia
		</body>
</html>
