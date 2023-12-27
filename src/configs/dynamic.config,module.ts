import { DynamicModule, Module } from '@nestjs/common';
import { DynamicConfigClass } from './dynamic.config.service';

@Module({})
export class DynamicConfigModule {
  static register(options: Record<string, any>): DynamicModule {
    return {
      module: DynamicConfigModule,
      providers: [
        {
          provide: 'CONFIG_OPTIONS',
          useValue: options,
        },
        DynamicConfigClass,
      ],
      exports: [DynamicConfigClass],
    };
  }
}
