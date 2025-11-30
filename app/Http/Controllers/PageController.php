<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class PageController extends Controller
{
    public function about()
    {
        return Inertia::render('Pages/About', [
            'title' => 'About Us - Cineverse',
            'description' => 'Learn more about Cineverse, your ultimate destination for movies and series.',
        ]);
    }

    public function contact()
    {
        return Inertia::render('Pages/Contact', [
            'title' => 'Contact Us - Cineverse',
            'description' => 'Get in touch with the Cineverse team.',
        ]);
    }

    public function faq()
    {
        return Inertia::render('Pages/FAQ', [
            'title' => 'Frequently Asked Questions - Cineverse',
            'description' => 'Find answers to common questions about Cineverse.',
        ]);
    }

    public function privacy()
    {
        return Inertia::render('Pages/Privacy', [
            'title' => 'Privacy Policy - Cineverse',
            'description' => 'Read our privacy policy to understand how we protect your data.',
        ]);
    }

    public function terms()
    {
        return Inertia::render('Pages/Terms', [
            'title' => 'Terms of Service - Cineverse',
            'description' => 'Read our terms of service for using Cineverse.',
        ]);
    }
}
