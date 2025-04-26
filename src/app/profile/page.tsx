'use client';

export default function ProfilePage() {
    return (
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile</h2>
                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-medium text-gray-900">Account Information</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            View and manage your account settings and preferences.
                        </p>
                    </div>
                    <div className="border-t border-gray-200 pt-6">
                        <h3 className="text-lg font-medium text-gray-900">Investment Portfolio</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Track your investments and view your portfolio performance.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
} 