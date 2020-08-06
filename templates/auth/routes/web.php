<?php

use App\Http\Controllers\Authentication\Login;
use App\Http\Controllers\Authentication\Logout;
use App\Http\Controllers\Authentication\ShowLoginForm;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('login', ShowLoginForm::class)->name('login')->middleware('guest');
Route::post('login', Login::class)->name('login.attempt')->middleware('guest');
Route::post('logout', Logout::class)->name('logout');

Route::get('/', function () {
    return Inertia::render('Home');
});
