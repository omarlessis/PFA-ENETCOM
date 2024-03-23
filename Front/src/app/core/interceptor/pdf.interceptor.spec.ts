import { TestBed } from '@angular/core/testing';

import { PdfInterceptor } from './pdf.interceptor';

describe('PdfInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      PdfInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: PdfInterceptor = TestBed.inject(PdfInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
