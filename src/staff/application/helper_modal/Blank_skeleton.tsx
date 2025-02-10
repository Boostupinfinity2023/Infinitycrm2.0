import React from "react";
import { Card, Skeleton } from "@nextui-org/react";

export default function App() {
    return (
        <table>
            <div className="grid grid-cols-4">
                {[1, 1, 1, 1, 1, , 1, 1].map(() => (
                    <>
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
                    </>
                ))}
            </div>
        </table>
    );
}
