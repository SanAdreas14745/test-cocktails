import {
  ApplicationRef,
  ComponentRef,
  Directive,
  effect,
  ElementRef,
  EnvironmentInjector,
  inject,
  input,
  OnDestroy,
  Renderer2,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import {LoaderComponent} from '../components/loader.component';


@Directive({
  selector: '[appLoader]',
  standalone: true
})
export class LoaderDirective implements OnDestroy {
  readonly isLoading = input.required<boolean>({alias: 'appLoader'});

  componentRef: ComponentRef<LoaderComponent> | null = null;

  private readonly appRef = inject(ApplicationRef);
  private readonly viewContainer = inject(ViewContainerRef);
  private readonly environmentInjector = inject(EnvironmentInjector);
  private readonly templateRef = inject<TemplateRef<unknown>>(TemplateRef);

  private readonly hostElement = inject(ElementRef);
  private readonly render = inject(Renderer2);

  constructor() {
    effect(() => this.renderTemplate(this.isLoading()));
  }

  ngOnDestroy(): void {
    this.removeLoaderView();
  }

  private renderTemplate(isLoading: boolean): void {
    if (isLoading) {
      this.viewContainer.clear();
      this.componentRef = this.createLoaderComponent();
    } else {
      this.removeLoaderView();
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }

  private removeLoaderView(): void {
    if (!this.componentRef) return;

    this.appRef.detachView(this.componentRef.hostView)
    this.componentRef.destroy();
    this.componentRef = null;
  }

  private createLoaderComponent(): ComponentRef<LoaderComponent> {
    return this.viewContainer.createComponent(LoaderComponent, {
      environmentInjector: this.environmentInjector,
    });
  }
}
