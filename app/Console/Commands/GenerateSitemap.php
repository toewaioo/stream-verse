<?php

namespace App\Console\Commands;

use App\Models\Movie;
use App\Models\Series;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class GenerateSitemap extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sitemap:generate';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate XML sitemap for search engines';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Generating sitemap...');

        $baseUrl = config('app.url');
        
        // Start XML
        $xml = '<?xml version="1.0" encoding="UTF-8"?>';
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

        // Homepage
        $xml .= $this->addUrl($baseUrl, '1.0', 'daily', now());

        // Movies index page
        $xml .= $this->addUrl($baseUrl . '/movies', '0.9', 'daily', now());

        // Series index page
        $xml .= $this->addUrl($baseUrl . '/series', '0.9', 'daily', now());

        // All public movies
        $movies = Movie::where('visibility_status', 'public')
            ->where('status', 'released')
            ->get(['slug', 'updated_at']);

        $this->info("Adding {$movies->count()} movies...");
        
        foreach ($movies as $movie) {
            $xml .= $this->addUrl(
                $baseUrl . '/movies/' . $movie->slug,
                '0.8',
                'weekly',
                $movie->updated_at
            );
        }

        // All public series
        $series = Series::where('visibility_status', 'public')
            ->where('status', '!=', 'upcoming')
            ->get(['slug', 'updated_at']);

        $this->info("Adding {$series->count()} series...");
        
        foreach ($series as $item) {
            $xml .= $this->addUrl(
                $baseUrl . '/series/' . $item->slug,
                '0.8',
                'weekly',
                $item->updated_at
            );
        }

        // Close XML
        $xml .= '</urlset>';

        // Save to public directory
        $path = public_path('sitemap.xml');
        File::put($path, $xml);

        $this->info("Sitemap generated successfully at: {$path}");
        $this->info("Total URLs: " . ($movies->count() + $series->count() + 3));

        return Command::SUCCESS;
    }

    /**
     * Add a URL entry to the sitemap
     */
    private function addUrl($loc, $priority = '0.5', $changefreq = 'weekly', $lastmod = null)
    {
        $xml = '<url>';
        $xml .= '<loc>' . htmlspecialchars($loc) . '</loc>';
        
        if ($lastmod) {
            $xml .= '<lastmod>' . $lastmod->format('Y-m-d') . '</lastmod>';
        }
        
        $xml .= '<changefreq>' . $changefreq . '</changefreq>';
        $xml .= '<priority>' . $priority . '</priority>';
        $xml .= '</url>';
        
        return $xml;
    }
}
