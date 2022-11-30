import React from "react";
import usePageLoading from "../hooks/usePageLoading";
import useToast from "../hooks/useToast";
import { PageLoading } from "./elements/pageLoading";
import Toast from "./elements/toast";
import Header from "./header";
import Sidebar from "./sidebar";

export default function Layout(props) {
    const {isLoadingActive} = usePageLoading();
    const {isToastActive, toast} = useToast()

    return (
        <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-gray-50 text-gray-800">
            <Sidebar />
            <main className="flex flex-col">
                <Header />
                <div className=" pl-72 pt-10 pr-10">
                    {props.children}
                </div>
            </main>
            {isLoadingActive && <PageLoading />}
            {isToastActive && <Toast text={toast.text} variant={toast.variant} />}
        </div>
    )
}