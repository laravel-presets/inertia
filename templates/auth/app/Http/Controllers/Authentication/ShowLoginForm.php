<?php

namespace App\Http\Controllers\Authentication;

use Inertia\Inertia;
use Inertia\Response;

final class ShowLoginForm
{
    public function __invoke(): Response
    {
        return Inertia::render('Authentication/Login');
    }
}
