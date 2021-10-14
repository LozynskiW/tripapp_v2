import {createRouter, createWebHashHistory} from "vue-router";
import Places from "@/views/Places";
import Home from "@/views/Home";
import Place from "@/views/Place";
import CommentList from "@/views/CommentList";
import PlaceContainer from "@/views/PlaceContainer";
import NotFound from "@/views/NotFound";
import Account from "@/views/Account";
import UserData from "@/views/UserData";

const routes = [
    {
        path: '/account',
        name: "Account",
        component: Account
    },
    {
        path: '/user',
        name: "UserData",
        component: UserData
    },
    {
        path: '/',
        name: "Home",
        component: Home
    },
    {
        path: '/places',
        name: "Places",
        component: Places
    },
    {
        path: '/places/:placeId',
        name: "Place",
        component: PlaceContainer,
        props: true,
        children: [
            {
                path: '',
                name: "PlaceData",
                component: Place
            },
            {
                path: 'comments',
                name: "Comments",
                component: CommentList
            }
        ]
    },
    {
        path: "/:catchAll(.*)",
        component: NotFound
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router