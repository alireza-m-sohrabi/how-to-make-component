import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  TemplateRef,
  ViewChild, ViewContainerRef
} from '@angular/core';
import {CommonModule, DOCUMENT} from '@angular/common';
import {fromEvent, Subject, switchMap, takeUntil, tap} from "rxjs";
import {DomPortalOutlet, PortalModule, TemplatePortal} from "@angular/cdk/portal";
import {extendRectangle, RectangleCoordinate, RectanglePointPosition} from "@how-to-make/shared/range-selector";

@Component({
  selector: 'angular-range-selector',
  standalone: true,
  imports: [CommonModule, PortalModule],
  templateUrl: './angular-range-selector.component.html',
  styleUrls: ['./angular-range-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AngularRangeSelectorComponent implements OnDestroy, AfterViewInit {
  constructor(@Inject(DOCUMENT) private document: Document, private viewContainerRef: ViewContainerRef) {
  }

  @ViewChild('templatePortalContent') templatePortalContent: TemplateRef<HTMLElement> | undefined;
  private _boundary: HTMLElement = this.document.documentElement;
  private destroyMainStream$ = new Subject<void>();
  private destroySubStream$ = new Subject();
  styleObject: RectangleCoordinate<string> | undefined;
  fixedPosition: RectanglePointPosition | undefined;
  show = false;

  @Input() set boundary(value: HTMLElement | ElementRef<HTMLElement> | string | undefined) {
    if (value instanceof ElementRef) {
      this._boundary = value.nativeElement;
    } else if (typeof value === 'string') {
      const boundary = this.document.querySelector(value) as HTMLElement;
      if (boundary) {
        this._boundary = boundary;
      }
    } else if (value) {
      this._boundary = value;
    }

    if (this.templatePortalContent) {
      this.setup();
    }
  }

  private setup() {

    this.onMouseDown().pipe(
      switchMap(() => this.onMouseMove().pipe(
        tap((event: MouseEvent | Event) => {
          if (event instanceof MouseEvent) {
            const {pageX: left, pageY: top} = event;

            if (this.fixedPosition) {
              const coordinate = extendRectangle(this.fixedPosition, {top, left});

              if (coordinate) {
                this.styleObject = {
                  height: coordinate.height + 'px',
                  width: coordinate.width + 'px',
                  top: coordinate.top + 'px',
                  left: coordinate.left + 'px'
                }
              }

            } else {
              this.fixedPosition = {left, top};
              this.show = true;
            }
          }
        }), takeUntil(this.destroySubStream$))),
      takeUntil(this.destroyMainStream$)
    ).subscribe();

    this.onMouseDown().pipe(switchMap(() =>
        this.onMouseUp().pipe(tap(() => this.clear()),
          takeUntil(this.destroySubStream$))),
      takeUntil(this.destroyMainStream$)).subscribe();
  }

  private onMouseMove() {
    return fromEvent(this.document.documentElement, 'mousemove');
  }

  private onMouseUp() {
    return fromEvent(this.document.documentElement, 'mouseup');
  }

  private onMouseDown() {
    return fromEvent(this._boundary, 'mousedown');
  }


  private clear() {
    this.fixedPosition = undefined;
    this.show = false;
    this.destroySubStream$.next(void 0);
    this.styleObject = undefined;
  }

  ngOnDestroy(): void {
    this.destroyMainStream$.next(void 0);
    this.destroyMainStream$.complete();
    this.destroySubStream$.next(void 0);
    this.destroySubStream$.complete();
  }

  ngAfterViewInit(): void {
    if (this.templatePortalContent) {
      const portal = new DomPortalOutlet(this.document.body, undefined, undefined, undefined, this.document);
      portal.attach(new TemplatePortal(this.templatePortalContent, this.viewContainerRef));

      this.setup();
    }

  }
}
