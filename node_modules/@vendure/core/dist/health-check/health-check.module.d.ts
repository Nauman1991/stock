import { TypeOrmHealthIndicator } from '@nestjs/terminus';
import { ConfigService } from '../config/config.service';
import { HealthCheckRegistryService } from './health-check-registry.service';
export declare class HealthCheckModule {
    private configService;
    private healthCheckRegistryService;
    private typeOrm;
    constructor(configService: ConfigService, healthCheckRegistryService: HealthCheckRegistryService, typeOrm: TypeOrmHealthIndicator);
}
