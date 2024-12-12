import React from 'react';
import { useRouteError } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';

export function ErrorBoundary() {
  const error = useRouteError() as Error;

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <Card className="max-w-md w-full bg-gray-800/50 backdrop-blur-lg p-8">
        <div className="text-center">
          <div className="bg-red-500/10 p-3 rounded-full w-fit mx-auto mb-4">
            <Icon name="alert-triangle" className="h-8 w-8 text-red-400" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-400 mb-6">
            {error?.message || 'An unexpected error occurred'}
          </p>
          <div className="space-y-4">
            <Button
              onClick={() => window.location.reload()}
              variant="outline"
              className="w-full"
            >
              <Icon name="refresh-cw" className="w-4 h-4 mr-2" />
              Try Again
            </Button>
            <Button
              onClick={() => window.history.back()}
              variant="ghost"
              className="w-full"
            >
              <Icon name="arrow-left" className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}