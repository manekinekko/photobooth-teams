import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import * as microsoftTeams from "@microsoft/teams-js";
import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";

if (environment.production) {
  enableProdMode();
}

if (window.__SURPPORTED_BROWSER__) {
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .then(() => {
      if (environment.production) {
        microsoftTeams.initialize();
        microsoftTeams.settings.setValidityState(true);
        microsoftTeams.settings.registerOnSaveHandler((saveEvent) => {
          microsoftTeams.settings.setSettings(environment.msTeams);
          saveEvent.notifySuccess();
        });
      }
    })
    .catch((err) => console.error(err));
}
