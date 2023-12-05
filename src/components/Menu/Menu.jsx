import { Link, useLocation } from "react-router-dom";
import "./Menu.css";
import { useEffect, useState } from "react";

export default function Menu(props) {

    const path = useLocation()

    const [width, setWidth] = useState(window.innerWidth)

    useEffect(() => {
        const updateWidth = () => {
            setWidth(window.innerWidth)
        }
        window.addEventListener("resize", updateWidth)
        return () => {
            window.removeEventListener("resize", updateWidth)
        }
    }, [])

    function scrollAlter(){
        const header = document.querySelector(".MenuHorizontal")
        const title = document.querySelector(".pageDescInner")
        const buttons = document.querySelector(".MenuLink")

        if(document.documentElement.scrollTop >= 80){
            header.classList.add("scroll")
            title.classList.add("scroll")
        } else {
            header.classList.remove("scroll")
            title.classList.remove("scroll")
        }
    }

    function selectLink(linkText) {
        const link = document.querySelector("."+linkText)
        const allLinks = document.querySelectorAll(".MenuLink")
        console.log(link)
        console.log(allLinks)

        allLinks.forEach((button) => {
            button.classList.remove("MenuActive")
        })
        link.classList.add("MenuActive")
    }

    if(width >= 900){
        window.onscroll = (scrollAlter)
    }

    return (
        <div className="Menu">
            <div className="MenuHorizontal">
                <Link onClick={() => selectLink("homeLink")} className={`MenuLink homeLink ${path.pathname === "/" ? "MenuActive" : ""}`} to="/">
                    Início
                </Link>
                <Link onClick={() => selectLink("newsLink")} className={`MenuLink newsLink ${path.pathname.startsWith("/news") ? "MenuActive" : ""}`} to="/news">Notícias</Link>
                <Link onClick={() => selectLink("aboutLink")} className={`MenuLink aboutLink ${path.pathname === "/about" ? "MenuActive" : ""}`} to="/about">Sobre Nós</Link>
                <Link onClick={() => selectLink("rcLink")} className={`MenuLink rcLink ${path.pathname === "/reportChannel" ? "MenuActive" : ""}`} to="/reportChannel">Canal de Denúncias</Link>
            </div>

            <div className="MenuDock">
            <Link className="Active" to="/">
                <i class="fa-solid fa-house"></i>
            </Link>
            <Link to="/news">
                <i class="fa-solid fa-newspaper"></i>
            </Link>
            <Link to="/about">
                <i class="fa-solid fa-circle-question"></i>
            </Link>
            <Link to="/reportChannel">
                <i class="fa-solid fa-bullhorn"></i>
            </Link>
            </div>
        </div>
    );
}
