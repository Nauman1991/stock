import { FacetValue } from '../../../entity/facet-value/facet-value.entity';
import { Facet } from '../../../entity/facet/facet.entity';
import { LocaleStringHydrator } from '../../../service/helpers/locale-string-hydrator/locale-string-hydrator';
import { FacetValueService } from '../../../service/services/facet-value.service';
import { RequestContext } from '../../common/request-context';
export declare class FacetEntityResolver {
    private facetValueService;
    private localeStringHydrator;
    constructor(facetValueService: FacetValueService, localeStringHydrator: LocaleStringHydrator);
    name(ctx: RequestContext, facetValue: FacetValue): Promise<string>;
    values(ctx: RequestContext, facet: Facet): Promise<FacetValue[]>;
}
