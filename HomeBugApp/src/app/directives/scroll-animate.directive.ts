import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';

@Directive({
    selector: '[scrollAnimate]',
    standalone: true,
})
export class ScrollAnimateDirective implements OnInit, OnDestroy {
    @Input() animationClass = 'visible';
    @Input() threshold = 0.3; 

    private observer!: IntersectionObserver;

    constructor(private el: ElementRef) { }

    ngOnInit() {
        this.observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    this.el.nativeElement.classList.add(this.animationClass);
                    this.observer.unobserve(this.el.nativeElement); 
                }
            },
            { threshold: this.threshold }
        );

        this.observer.observe(this.el.nativeElement);
    }

    ngOnDestroy() {
        this.observer.disconnect();
    }
}