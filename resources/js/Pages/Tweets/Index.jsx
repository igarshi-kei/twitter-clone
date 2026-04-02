import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm, Head } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Index({ auth, tweets }) {
    // Inertia専用のフォーム管理フック
    const { data, setData, post, processing, reset, errors } = useForm({
        message: '',
    });

    const submit = (e) => {
        e.preventDefault();
        // TweetControllerのstoreメソッドへ飛ばす
        post(route('tweets.store'), { 
            onSuccess: () => reset() // 成功したら入力欄を空にする
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="タイムライン" />

            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                {/* 投稿フォーム */}
                <form onSubmit={submit}>
                    <textarea
                        value={data.message}
                        placeholder="今どうしてる？"
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={e => setData('message', e.target.value)}
                    ></textarea>
                    <InputError message={errors.message} className="mt-2" />
                    <PrimaryButton className="mt-4" disabled={processing}>
                        ツイートする
                    </PrimaryButton>
                </form>

                {/* ツイート一覧表示 */}
                <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                    {tweets.map(tweet => (
                        <div key={tweet.id} className="p-6 flex space-x-2">
                            <div className="flex-1">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <span className="text-gray-800 font-bold">{tweet.user.name}</span>
                                        <small className="ml-2 text-sm text-gray-600">
                                            {new Date(tweet.created_at).toLocaleString()}
                                        </small>
                                    </div>
                                </div>
                                <p className="mt-4 text-lg text-gray-900">{tweet.message}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}