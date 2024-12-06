import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/ui/Icon';
import { PodcastPreview } from '@/components/PodcastPreview/PodcastPreview';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

export function Footer() {
  const { t } = useTranslation();
  const [showPodcast, setShowPodcast] = useState(false);

  const podcastInfo = {
    title: "SHELTR: Tech for Good",
    url: "https://open.spotify.com/show/0123456789",  // Update with actual Spotify show URL
    latestEpisode: {
      title: "Making a Real Difference",
      duration: "28:45",
      description: "Join us as we explore how blockchain technology and direct support are transforming lives in our community."
    }
  };

  return (
    <footer className="bg-gray-900 sticky bottom-0 w-full z-50 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col items-center md:flex-row md:justify-between">
          {/* Brand and Podcast */}
          <div className="flex flex-col items-center md:items-start">
            <Link to="/" className="inline-block">
              <h2 className="text-lg font-bold text-white">SHELTR</h2>
            </Link>
            <p className="mt-2 text-sm text-gray-400 text-center md:text-left">
              Hacking Homelessness with Technology.
            </p>
            <button
              onClick={() => setShowPodcast(true)}
              className="mt-4 inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors group"
            >
              <Icon name="headphones" className="w-4 h-4 mr-2 group-hover:text-green-500 transition-colors" />
              Listen to Latest Episode
            </button>
          </div>

          {/* Social Links and Language */}
          <div className="mt-6 md:mt-0 flex flex-col items-center md:items-end">
            <div className="flex space-x-4">
              <a
                href="https://youtube.com/@sheltr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors group"
                title="YouTube Channel"
              >
                <Icon name="youtube" className="w-5 h-5 group-hover:text-red-500 transition-colors" />
                <span className="sr-only">YouTube Channel</span>
              </a>
              <a
                href={podcastInfo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors group"
                title="Listen to Podcast"
              >
                <Icon name="headphones" className="w-5 h-5 group-hover:text-green-500 transition-colors" />
                <span className="sr-only">Listen to Podcast</span>
              </a>
              <a
                href="https://tiktok.com/@sheltr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors group"
                title="Follow on TikTok"
              >
                <Icon name="video" className="w-5 h-5 group-hover:text-pink-500 transition-colors" />
                <span className="sr-only">TikTok</span>
              </a>
              <a
                href="https://linkedin.com/company/sheltr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors group"
                title="Connect on LinkedIn"
              >
                <Icon name="linkedin" className="w-5 h-5 group-hover:text-blue-500 transition-colors" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href="https://sheltr.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors group"
                title="Visit Website"
              >
                <Icon name="globe" className="w-5 h-5 group-hover:text-indigo-500 transition-colors" />
                <span className="sr-only">Website</span>
              </a>
            </div>
            <div className="mt-4">
              <LanguageSwitcher />
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-4 border-t border-gray-800">
          <p className="text-sm text-gray-400 text-center">
            © 2024 SHELTR. All rights reserved.
          </p>
        </div>
      </div>

      {/* Podcast Modal */}
      {showPodcast && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-lg max-w-md w-full">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-white">
                Latest Episode
              </h3>
              <button
                onClick={() => setShowPodcast(false)}
                className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-800 transition-colors"
              >
                <Icon name="x" className="h-5 w-5" />
              </button>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 hover:bg-gray-750 transition-colors">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-green-600 rounded-md flex items-center justify-center">
                    <Icon name="headphones" className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-medium">{podcastInfo.latestEpisode.title}</h4>
                  <p className="text-sm text-gray-400 mt-1">{podcastInfo.latestEpisode.description}</p>
                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <Icon name="clock" className="h-4 w-4 mr-1" />
                    <span>{podcastInfo.latestEpisode.duration}</span>
                  </div>
                </div>
              </div>
              <a
                href={podcastInfo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center justify-center w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                <Icon name="headphones" className="h-5 w-5 mr-2" />
                Listen on Spotify
              </a>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
} 