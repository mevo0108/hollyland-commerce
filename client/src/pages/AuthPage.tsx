import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/context/LanguageContext";

const AuthPage = () => {
    const { t } = useLanguage();
    const [isLoading, setIsLoading] = useState(false);

    return (
        <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-5rem)] p-4">
            <Card className="w-full max-w-md bg-[#f9e8c1] border-[#c49a6c]">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold tracking-tight text-center text-[#2c1810] font-serif">
                        {t('welcome_back')}
                    </CardTitle>
                    <CardDescription className="text-[#5c4838] text-center font-serif">
                        {t('auth_description')}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="login" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 bg-[#f0e0c0]">
                            <TabsTrigger
                                value="login"
                                className="data-[state=active]:bg-[#8B4513] data-[state=active]:text-[#f9e8c1]"
                            >
                                {t('login')}
                            </TabsTrigger>
                            <TabsTrigger
                                value="register"
                                className="data-[state=active]:bg-[#8B4513] data-[state=active]:text-[#f9e8c1]"
                            >
                                {t('register')}
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="login" className="space-y-4">
                            <div className="space-y-4">
                                <Input
                                    type="email"
                                    placeholder={t('email')}
                                    className="bg-[#f9f3e7] border-[#c49a6c]"
                                />
                                <Input
                                    type="password"
                                    placeholder={t('password')}
                                    className="bg-[#f9f3e7] border-[#c49a6c]"
                                />
                                <Button
                                    className="w-full bg-[#8B4513] hover:bg-[#6B3009] text-[#f9e8c1] border border-[#c49a6c]"
                                    disabled={isLoading}
                                >
                                    {isLoading ? t('logging_in') : t('login')}
                                </Button>
                            </div>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-[#c49a6c]" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-[#f9e8c1] px-2 text-[#5c4838]">
                                        {t('or_continue_with')}
                                    </span>
                                </div>
                            </div>

                            <Button
                                variant="outline"
                                className="w-full bg-[#f9f3e7] hover:bg-[#f0e0c0] border-[#c49a6c] text-[#2c1810]"
                                disabled={isLoading}
                            >
                                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                                    <path
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        fill="#4285F4"
                                    />
                                    <path
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        fill="#34A853"
                                    />
                                    <path
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        fill="#FBBC05"
                                    />
                                    <path
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        fill="#EA4335"
                                    />
                                </svg>
                                Google
                            </Button>
                        </TabsContent>

                        <TabsContent value="register" className="space-y-4">
                            <div className="space-y-4">
                                <Input
                                    type="text"
                                    placeholder={t('username')}
                                    className="bg-[#f9f3e7] border-[#c49a6c]"
                                />
                                <Input
                                    type="email"
                                    placeholder={t('email')}
                                    className="bg-[#f9f3e7] border-[#c49a6c]"
                                />
                                <Input
                                    type="password"
                                    placeholder={t('password')}
                                    className="bg-[#f9f3e7] border-[#c49a6c]"
                                />
                                <Input
                                    type="password"
                                    placeholder={t('confirm_password')}
                                    className="bg-[#f9f3e7] border-[#c49a6c]"
                                />
                                <Button
                                    className="w-full bg-[#8B4513] hover:bg-[#6B3009] text-[#f9e8c1] border border-[#c49a6c]"
                                    disabled={isLoading}
                                >
                                    {isLoading ? t('creating_account') : t('create_account')}
                                </Button>
                            </div>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-[#c49a6c]" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-[#f9e8c1] px-2 text-[#5c4838]">
                                        {t('or_continue_with')}
                                    </span>
                                </div>
                            </div>

                            <Button
                                variant="outline"
                                className="w-full bg-[#f9f3e7] hover:bg-[#f0e0c0] border-[#c49a6c] text-[#2c1810]"
                                disabled={isLoading}
                            >
                                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                                    <path
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        fill="#4285F4"
                                    />
                                    <path
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        fill="#34A853"
                                    />
                                    <path
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        fill="#FBBC05"
                                    />
                                    <path
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        fill="#EA4335"
                                    />
                                </svg>
                                Google
                            </Button>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
};

export default AuthPage; 