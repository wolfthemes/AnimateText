class AnimateText {

    element;
    type;
    delay;
    
    constructor( element, type ) {

        const { animationDelay } = element.dataset;

        this.element = element;
        this.type = type;
        this.delay = Number(animationDelay);
        
        // Init SplitType
        this.init();

        // Re-initialize the Split Text on window resize.
        window.addEventListener("resize", () => {
            this.init();
        });
    }

    init() {
        
        // Create SplitType
        new SplitType( this.element, { types: this.type + 's' } );

        var currentType = this.type,
            wrapline = this.wrapLine,
            delay = this.delay / 1000;

        // Add delays
        this.element.querySelectorAll("." + this.type).forEach(function(el, index){
            el.style.transitionDelay = `${
            delay ? delay + index / 50 : index / 50
            }s`;

            if ( "line" === currentType ) {
                wrapline( el );
            }
        } );
    }

    wrapLine(el, wrapper) {
        wrapper = wrapper || document.createElement( "div" );
        wrapper.classList = "line-wrapper";
        el.parentNode.insertBefore(wrapper, el);
        wrapper.appendChild(el);
    }
}