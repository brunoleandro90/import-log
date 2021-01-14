import { ElementRef } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FormBaseComponent } from "src/app/shared/base-components/form-base.component";
import { Log } from "src/app/shared/models/log";

export abstract class LogBaseComponent extends FormBaseComponent {

  errors: any[] = [];
  logForm!: FormGroup;

  constructor() {
    super();

    this.validationMessages = {
      ip: {
        required: 'Escolha um IP',
      },
      date: {
        required: 'Informe a Data'
      },
      method: {
        required: 'Informe o Método'
      },
      url: {
        required: 'Informe a URL',
      },
      httpVersion: {
        required: 'Informe o HTTP Version',
      },
      httpStatus: {
        required: 'Informe o HTTP Status',
      },
      length: {
        required: 'Informe o Length',
      },
      referer: {
        required: 'Informe a URL Referer',
      },
      userAgent: {
        required: 'Informe o User-Agent',
      }
    }
    super.configurarMensagensValidacaoBase(this.validationMessages);
  }

  protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
    super.configurarValidacaoFormularioBase(formInputElements, this.logForm);
  }
}