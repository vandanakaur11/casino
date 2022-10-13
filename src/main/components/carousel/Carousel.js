import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { gamesList } from "../../../data/Data";

const CarouselComp = () => {
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 4,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1301 },
            items: 3,
        },
        tablet: {
            breakpoint: { max: 1300, min: 464 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 800, min: 0 },
            items: 1,
        },
    };
    return (
        <div>
            <Carousel
                responsive={responsive}
                swipeable={false}
                draggable={false}
                showDots={true}
                // customTransition="all .5"
                // transitionDuration={500}
            >
                {gamesList.map((game, i) => (
                    <div index={i}>
                        <img src={game?.name} style={{ borderRadius: "5px" }} alt="" />
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default CarouselComp;
