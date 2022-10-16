import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { SpinnerInterceptorService } from "./services/spinner-interceptor.service";

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: SpinnerInterceptorService,
      multi: true
    }
  ]
})
export class CoreModule {}