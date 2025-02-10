import React from "react";
import { Card, CardBody, CardHeader, Skeleton, Button } from "@nextui-org/react"

export default function App() {
    return (
        <div className="min-h-screen">
            <div className="grid grid-cols-4 gap-4">
                <div className="m-1">
                    <Skeleton className="rounded-lg">
                        <div className="h-24 rounded-lg bg-default-300"></div>
                    </Skeleton>
                </div>
                <div className="m-1">
                    <Skeleton className="rounded-lg">
                        <div className="h-24 rounded-lg bg-default-300"></div>
                    </Skeleton>
                </div>
                <div className="m-1">
                    <Skeleton className="rounded-lg" >
                        <div className="h-24 rounded-lg bg-default-300"></div>
                    </Skeleton>
                </div>
                <div className="m-1">
                    <Skeleton className="rounded-lg">
                        <div className="h-24 rounded-lg bg-default-300"></div>
                    </Skeleton>
                </div>

            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-3">
                <Card className="bg-white">
                    <CardHeader className="flex justify-between items-center">
                        <Skeleton className="h-6 w-32 rounded-lg" />
                        <Skeleton className="h-8 w-20 rounded-lg" />
                    </CardHeader>
                    <CardBody className="grid gap-3">
                        <div>
                            <Skeleton className="h-4 w-full rounded-lg mb-2" />
                            <Skeleton className="h-4 w-3/4 rounded-lg" />
                        </div>
                        <div>
                            <Skeleton className="h-4 w-full rounded-lg mb-2" />
                            <Skeleton className="h-4 w-3/4 rounded-lg" />
                        </div>
                        <div>
                            <Skeleton className="h-4 w-full rounded-lg mb-2" />
                            <Skeleton className="h-4 w-3/4 rounded-lg" />
                        </div>
                    </CardBody>
                </Card>

                <Card className="bg-white">
                    <CardHeader>
                        <Skeleton className="h-6 w-32 rounded-lg" />
                    </CardHeader>
                    <CardBody className="flex flex-col items-center">
                        <Skeleton className="h-48 w-48 rounded-full mb-4" />

                        <div className="flex justify-center w-full gap-4">
                            <Skeleton className="h-4 w-4 rounded-lg mb-2" />
                            <Skeleton className="h-4 w-4 rounded-lg mb-2" />
                            <Skeleton className="h-4 w-4 rounded-lg mb-2" />
                        </div>
                    </CardBody>
                </Card>
            </div>

            <Card className="bg-white mt-4">
                <CardBody className="grid gap-5">
                    <div>
                        <Skeleton className="h-4 w-full rounded-lg mb-2" />
                        <Skeleton className="h-4 w-3/4 rounded-lg" />
                    </div>
                    <div>
                        <Skeleton className="h-4 w-full rounded-lg mb-2" />
                        <Skeleton className="h-4 w-3/4 rounded-lg" />
                    </div>
                    <div>
                        <Skeleton className="h-4 w-full rounded-lg mb-2" />
                        <Skeleton className="h-4 w-3/4 rounded-lg" />
                    </div>
                    <div>
                        <Skeleton className="h-4 w-full rounded-lg mb-2" />
                        <Skeleton className="h-4 w-3/4 rounded-lg" />
                    </div>
                    <div>
                        <Skeleton className="h-4 w-full rounded-lg mb-2" />
                        <Skeleton className="h-4 w-3/4 rounded-lg" />
                    </div>
                </CardBody>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-3">
                <Card className="bg-white">
                    <CardHeader className="flex justify-between items-center">
                        <Skeleton className="h-6 w-32 rounded-lg" />
                        <Skeleton className="h-8 w-20 rounded-lg" />
                    </CardHeader>
                    <CardBody className="grid gap-3">
                        <div>
                            <Skeleton className="h-4 w-full rounded-lg mb-2" />
                            <Skeleton className="h-4 w-3/4 rounded-lg" />
                        </div>
                        <div>
                            <Skeleton className="h-4 w-full rounded-lg mb-2" />
                            <Skeleton className="h-4 w-3/4 rounded-lg" />
                        </div>
                        <div>
                            <Skeleton className="h-4 w-full rounded-lg mb-2" />
                            <Skeleton className="h-4 w-3/4 rounded-lg" />
                        </div>
                    </CardBody>
                </Card>

                <Card className="bg-white">
                    <CardHeader>
                        <Skeleton className="h-6 w-32 rounded-lg" />
                    </CardHeader>
                    <CardBody className="flex flex-col items-center">
                        <Skeleton className="h-48 w-48 rounded-full mb-4" />

                        <div className="flex justify-center w-full gap-4">
                            <Skeleton className="h-4 w-4 rounded-lg mb-2" />
                            <Skeleton className="h-4 w-4 rounded-lg mb-2" />
                            <Skeleton className="h-4 w-4 rounded-lg mb-2" />
                        </div>
                    </CardBody>
                </Card>
            </div>


        </div>

    );
}
