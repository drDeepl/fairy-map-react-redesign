import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios'; 

declare namespace Components {
    namespace Schemas {
        export interface AddAudioStoryApplicationDto {
            /**
             *
             */
            userAudioId: number;
            /**
             * ид пользователя, создавшего заявку
             */
            userId: number;
            /**
             *
             */
            storyId: number;
        }
        export interface AddAudioStoryDto {
            /**
             *
             */
            userAudioId: number;
            /**
             *
             */
            userId: number;
            /**
             * оценка от проверяющего
             */
            moderateScore: number;
        }
        export interface AddConstituentDto {
            /**
             *
             */
            name: string;
        }
        export interface AddEthnicGroupDto {
            /**
             *
             */
            name: string;
            /**
             *
             */
            languageId: number;
        }
        export interface AddEthnicGroupMapDto {
            /**
             * географическая долгота
             */
            longitude: number;
            /**
             * географическая широта
             */
            latitude: number;
        }
        export interface AddEthnicGroupToConstituentDto {
            /**
             *
             */
            constituentRfId: number;
            /**
             *
             */
            ethnicGroupId: number;
        }
        export interface AddLanguageDto {
            /**
             *
             */
            name: string;
        }
        export interface AddRatingAudioStoryDto {
            /**
             * оценка
             */
            rating: number;
            /**
             * id озвучки
             */
            audioId: number;
        }
        export interface AddStoryDto {
            /**
             * название истории
             */
            name: string;
            /**
             * id этнической группы
             */
            ethnicGroupId: number;
            /**
             * текст сказки
             */
            text: string;
        }
        export interface AddStoryRequestDto {
            /**
             * название истории
             */
            storyName: string;
            /**
             * порядковый номер заявки
             */
            id: number;
            /**
             * статус заявки
             */
            status: "SEND" | "SUCCESSED" | "CANCELLED";
            /**
             * комментарий от проверяющего
             */
            comment: string;
        }
        export interface AddStoryRequestEntity {
            /**
             *
             */
            id: number;
            /**
             * название истории
             */
            storyName: string;
            /**
             * статус заявки
             */
            status: string;
            /**
             * комментарий проверяющего
             */
            comment: string;
            /**
             * ид пользователя, создавшего заявку
             */
            userId: number;
        }
        export interface AddTextStoryDto {
            /**
             *
             */
            text: string;
        }
        export interface AddedRatingAudioStoryDto {
            /**
             * ид озвучки
             */
            audioId: number;
            /**
             * оценка текущего пользователя
             */
            ratingCurrentUser: number;
            /**
             * общая оценка озвучки
             */
            ratingAudioStory: number;
        }
        export interface AudioApplicationWithUserAudioResponseDto {
            /**
             * ид заявки
             */
            id: number;
            /**
             * данные о озвучки пользователя
             */
            userAudio: {
                /**
                 * ид озвучки
                 */
                id: number;
                /**
                 * название файла
                 */
                name: string;
                /**
                 * пользовательское название озвучки
                 */
                originalName: string;
                /**
                 * прямая ссылка на файл
                 */
                srcAudio: string;
                /**
                 * информация о языке
                 */
                language: {
                    /**
                     *
                     */
                    name: string;
                    /**
                     *
                     */
                    id: number;
                };
            };
            /**
             * информация о пользователе
             */
            user: {
                /**
                 * id пользователя
                 */
                id: number;
                /**
                 * имя пользователя
                 */
                firstName: string;
                /**
                 * фамилия пользователя
                 */
                lastName: string;
            };
            /**
             * статус заявки
             */
            status: string;
            /**
             * комментарий, проверяющего
             */
            comment: string;
            /**
             * дата создания заявки
             */
            createdAt: string; // date-time
            /**
             * дата редактирования заявки
             */
            updatedAt: string; // date-time
            /**
             * ид сказки
             */
            storyId: number;
            /**
             * название сказки
             */
            storyName: string;
        }
        export interface AudioResponseDto {
            /**
             * id озвучки
             */
            id: number;
            /**
             * язык озвучки
             */
            language: {
                /**
                 *
                 */
                name: string;
                /**
                 *
                 */
                id: number;
            };
            /**
             * ссылка на файл с озвучкой
             */
            srcAudio: string;
            /**
             * автор озвучки
             */
            author: {
                /**
                 * id пользователя
                 */
                id: number;
                /**
                 * имя пользователя
                 */
                firstName: string;
                /**
                 * фамилия пользователя
                 */
                lastName: string;
            };
            /**
             * рейтинг озвучки
             */
            commonRating: number;
        }
        export interface AudioStoryRequestEntity {
            id: number;
            userId: number;
            userAudioId: number;
            status: string;
            typeRequest: string;
            storyId: number;
            comment: string;
        }
        export interface AudioStoryResponseDto {
            /**
             * id озвучки
             */
            id: number;
            /**
             * id сказки
             */
            storyId: number;
            /**
             * язык озвучки
             */
            language: {
                /**
                 *
                 */
                name: string;
                /**
                 *
                 */
                id: number;
            };
            /**
             * ссылка на файл с озвучкой
             */
            srcAudio: string;
            /**
             * автор озвучки
             */
            author: {
                /**
                 * id пользователя
                 */
                id: number;
                /**
                 * имя пользователя
                 */
                firstName: string;
                /**
                 * фамилия пользователя
                 */
                lastName: string;
            };
            /**
             * рейтинг озвучки
             */
            commonRating: number;
        }
        export interface AuthorAudioStoryResponseDto {
            /**
             * id пользователя
             */
            id: number;
            /**
             * имя пользователя
             */
            firstName: string;
            /**
             * фамилия пользователя
             */
            lastName: string;
        }
        export interface BadRequestDto {
            /**
             *
             */
            statusCode: number;
            /**
             *
             */
            message: string[];
            /**
             *
             */
            error: string;
        }
        export interface BaseRequestExceptionDto {
            /**
             *
             */
            statusCode: number;
        }
        export interface BaseUserAudioDto {
            /**
             *
             */
            name: string;
            /**
             *
             */
            languageId: number;
        }
        export interface Buffer {
        }
        export interface ConstituentDto {
            /**
             *
             */
            name: string;
            /**
             *
             */
            id: number;
        }
        export interface ConstituentFilledDto {
            /**
             *
             */
            constituentId: number;
            /**
             *
             */
            ethnicGroupCount: number;
            /**
             *
             */
            filled: number;
        }
        export interface CreateAddStoryRequestDto {
            /**
             * название истории
             */
            storyName: string;
        }
        export interface DeleteEthnicGroupToConstituentDto {
            /**
             *
             */
            constituentRfId: number;
            /**
             *
             */
            ethnicGroupId: number;
        }
        export interface EditAddStoryRequestDto {
            /**
             * статус заявки берется является ENUM
             */
            status: "SEND" | "SUCCESSED" | "CANCELLED";
            /**
             * комментарий
             */
            comment: string;
        }
        export interface EditAudioStoryApplicaitonDto {
            /**
             *
             */
            comment: string;
            /**
             *
             */
            status: string;
        }
        export interface EditConstituentDto {
            /**
             *
             */
            name: string;
            /**
             *
             */
            languageId: number;
        }
        export interface EditEthnicGroupDto {
            /**
             *
             */
            name: string;
            /**
             *
             */
            languageId: number;
        }
        export interface EditStoryDto {
            /**
             * название истории
             */
            name: string;
            /**
             * id этнической группы
             */
            ethnicGroupId: number;
            /**
             * текст сказки
             */
            text: string;
        }
        export interface EthnicGroupDto {
            /**
             *
             */
            name: string;
            /**
             *
             */
            languageId: number;
            /**
             *
             */
            id: number;
        }
        export interface EthnicGroupLanguageDto {
            /**
             *
             */
            id: number;
            /**
             *
             */
            name: string;
            /**
             *
             */
            language: {
                /**
                 *
                 */
                name: string;
                /**
                 *
                 */
                id: number;
            };
        }
        export interface EthnicGroupMapDto {
            /**
             * географическая долгота
             */
            longitude: number;
            /**
             * географическая широта
             */
            latitude: number;
            /**
             *
             */
            id: number;
            /**
             *
             */
            constituentId: number;
        }
        export interface EthnicGroupMapPointEntity {
            /**
             *
             */
            id: number;
            /**
             *
             */
            ethnicGroupId: number;
            /**
             *
             */
            longitude: number;
            /**
             *
             */
            latitude: number;
        }
        export interface EthnicGroupMapPointEntityWithConstituents {
            /**
             *
             */
            id: number;
            /**
             *
             */
            ethnicGroupId: number;
            /**
             *
             */
            longitude: number;
            /**
             *
             */
            latitude: number;
            /**
             * объект региона
             */
            constituent: {
                /**
                 *
                 */
                name: string;
                /**
                 *
                 */
                id: number;
            };
        }
        export interface EthnicGroupMapWithGroupDto {
            /**
             * географическая долгота
             */
            longitude: number;
            /**
             * географическая широта
             */
            latitude: number;
            /**
             * объект с этнической группой
             */
            ethnicGroup: {
                /**
                 *
                 */
                name: string;
                /**
                 *
                 */
                languageId: number;
                /**
                 *
                 */
                id: number;
            };
        }
        export interface EthnicGroupPointDto {
            /**
             * Уникальный идентификатор точки
             */
            idPoint: number;
            /**
             * Идентификатор этнической группы
             */
            ethnicGroupId: number;
            /**
             * Название этнической группы
             */
            ethnicGroupName: string;
            /**
             * Широта точки
             */
            latitude: number;
            /**
             * Долгота точки
             */
            longitude: number;
        }
        export interface EthnicGroupToConstituentDto {
            /**
             *
             */
            constituentRfId: number;
            /**
             *
             */
            ethnicGroupId: number;
            /**
             *
             */
            id: number;
        }
        export interface FeatureGeometryDto {
            /**
             * Тип геометрии
             */
            type: string;
            geometries: GeometryPropertiesDto[];
        }
        export interface FeatureGeometryPropertiesDto {
            /**
             * id
             */
            id: string;
            /**
             * feature topojson
             */
            name: string;
            /**
             * Shape group
             */
            shapeGroup: string;
            /**
             * Shape ID
             */
            shapeID: string;
            /**
             * Shape ISO
             */
            shapeISO: string;
            /**
             * Shape type
             */
            shapeType: string;
            /**
             * Точки с этническими группами
             */
            ethnicGroupsPoints: EthnicGroupPointDto[];
        }
        export interface GeometryCollectionDto {
            /**
             * Массив свойств объекта
             */
            map: FeatureGeometryDto[];
        }
        export interface GeometryPropertiesDto {
            /**
             * массив с дугам
             * example:
             * [
             *   [
             *     398223,
             *     46698
             *   ]
             * ]
             */
            arcs: any[][];
            type: string;
            properties: FeatureGeometryPropertiesDto;
        }
        export interface ImageStoryDto {
            /**
             *
             */
            filename: string;
            /**
             *
             */
            buffer: {
                [key: string]: any;
            };
        }
        export interface LanguageDto {
            /**
             *
             */
            name: string;
            /**
             *
             */
            id: number;
        }
        export interface MapDto {
            /**
             * данные карты
             */
            data: {
                /**
                 * тип
                 */
                type: string;
                /**
                 * массив с дугам
                 * example:
                 * [
                 *   [
                 *     398223,
                 *     46698
                 *   ]
                 * ]
                 */
                arcs: any[][];
                /**
                 * объект преобразования
                 */
                transform: {
                    /**
                     * example:
                     * [
                     *   0.322,
                     *   0.943
                     * ]
                     */
                    scale: any[][];
                    /**
                     * example:
                     * [
                     *   0.322,
                     *   0.943
                     * ]
                     */
                    translate: any[][];
                };
                /**
                 * Коллекция с геометрией карты
                 */
                objects: {
                    /**
                     * Массив свойств объекта
                     */
                    map: FeatureGeometryDto[];
                };
            };
        }
        export interface MapTopologyDto {
            /**
             * тип
             */
            type: string;
            /**
             * массив с дугам
             * example:
             * [
             *   [
             *     398223,
             *     46698
             *   ]
             * ]
             */
            arcs: any[][];
            /**
             * объект преобразования
             */
            transform: {
                /**
                 * example:
                 * [
                 *   0.322,
                 *   0.943
                 * ]
                 */
                scale: any[][];
                /**
                 * example:
                 * [
                 *   0.322,
                 *   0.943
                 * ]
                 */
                translate: any[][];
            };
            /**
             * Коллекция с геометрией карты
             */
            objects: {
                /**
                 * Массив свойств объекта
                 */
                map: FeatureGeometryDto[];
            };
        }
        export interface PageMetaDto {
            /**
             * номер текущей страницы
             */
            page: number;
            /**
             * количество элементов на странице
             */
            take: number;
            /**
             * количество элементов всего
             */
            itemCount: number;
            /**
             * количество страниц
             */
            pageCount: number;
            /**
             * есть предыдущая страница
             */
            hasPreviousPage: boolean;
            /**
             * есть следующая страница
             */
            hasNextPage: boolean;
        }
        export interface PageResponseDto {
            data: any[][];
            /**
             * информация о странице
             */
            meta: {
                /**
                 * номер текущей страницы
                 */
                page: number;
                /**
                 * количество элементов на странице
                 */
                take: number;
                /**
                 * количество элементов всего
                 */
                itemCount: number;
                /**
                 * количество страниц
                 */
                pageCount: number;
                /**
                 * есть предыдущая страница
                 */
                hasPreviousPage: boolean;
                /**
                 * есть следующая страница
                 */
                hasNextPage: boolean;
            };
        }
        export interface PreviewAudioStoryResponseDto {
            /**
             * id истории
             */
            id: number;
            /**
             * название истории
             */
            name: string;
            /**
             * url обложки
             */
            srcImg: string;
            /**
             * массив с озвучками
             */
            audios: AudioResponseDto[];
        }
        export interface RatingAudioStoryDto {
            /**
             * номер озвучки
             */
            audioId: number;
            /**
             * среднее значение озвучки
             */
            ratingAudio: number;
        }
        export interface SignInRequestDto {
            /**
             *
             */
            email: string;
            /**
             *
             */
            password: string;
        }
        export interface SignUpRequestDto {
            /**
             *
             */
            email: string;
            /**
             *
             */
            password: string;
            /**
             *
             */
            firstName: string;
            /**
             *
             */
            lastName: string;
        }
        export interface StoryBookResponseDto {
            /**
             * название истории
             */
            name: string;
            /**
             * id сказки
             */
            id: number;
            /**
             * id этнической группы
             */
            ethnicGroup: {
                /**
                 *
                 */
                name: string;
                /**
                 *
                 */
                languageId: number;
                /**
                 *
                 */
                id: number;
            };
            /**
             * url для получения обложки сказки
             */
            srcImg: string | null;
            /**
             * текст сказки
             */
            text: string | null;
        }
        export interface StoryBookWithAudiosResponseDto {
            /**
             * id сказки
             */
            id: number;
            /**
             * название истории
             */
            name: string;
            /**
             * id этнической группы
             */
            ethnicGroup: {
                /**
                 *
                 */
                name: string;
                /**
                 *
                 */
                languageId: number;
                /**
                 *
                 */
                id: number;
            };
            /**
             * url для получения обложки сказки
             */
            srcImg: string | null;
            /**
             * текст сказки
             */
            text: string | null;
            /**
             * одобренные озвучки для сказки
             */
            audios: AudioStoryResponseDto[];
        }
        export interface StoryDto {
            /**
             * название истории
             */
            name: string;
            /**
             * id сказки
             */
            id: number;
            /**
             * id этнической группы
             */
            ethnicGroup: {
                /**
                 *
                 */
                name: string;
                /**
                 *
                 */
                languageId: number;
                /**
                 *
                 */
                id: number;
            };
        }
        export interface StoryWithTextDto {
            /**
             * название истории
             */
            name: string;
            /**
             * id сказки
             */
            id: number;
            /**
             * id этнической группы
             */
            ethnicGroup: {
                /**
                 *
                 */
                name: string;
                /**
                 *
                 */
                languageId: number;
                /**
                 *
                 */
                id: number;
            };
            /**
             * текст сказки
             */
            text: string;
        }
        export interface StreamableFile {
        }
        export interface TextStoryDto {
            /**
             *
             */
            text: string;
            /**
             *
             */
            id: number;
        }
        export interface TokensResponseDto {
            /**
             * access token
             */
            accessToken: string;
        }
        export interface TransformDto {
            /**
             * example:
             * [
             *   0.322,
             *   0.943
             * ]
             */
            scale: any[][];
            /**
             * example:
             * [
             *   0.322,
             *   0.943
             * ]
             */
            translate: any[][];
        }
        export interface UserAudioResponseDto {
            /**
             * userAudioId
             */
            userAudioId: number;
            /**
             * url для прослушивания файла
             */
            srcAudio: string;
            /**
             * информация о языке озвучки
             */
            language: {
                /**
                 *
                 */
                name: string;
                /**
                 *
                 */
                id: number;
            };
            /**
             * изначальное название озвучки
             */
            originalName: string;
        }
        export interface UserAudioWithLanguageResponseDto {
            /**
             * ид озвучки
             */
            id: number;
            /**
             * название файла
             */
            name: string;
            /**
             * пользовательское название озвучки
             */
            originalName: string;
            /**
             * прямая ссылка на файл
             */
            srcAudio: string;
            /**
             * информация о языке
             */
            language: {
                /**
                 *
                 */
                name: string;
                /**
                 *
                 */
                id: number;
            };
        }
        export interface UserResponseDto {
            /**
             *
             */
            firstName: string;
            /**
             *
             */
            lastName: string;
            /**
             *
             */
            email: string;
            /**
             *
             */
            role: string;
            /**
             *
             */
            id: number;
        }
        export interface ValidationExceptionResponseDto {
            /**
             * статус код
             */
            statusCode: number;
            /**
             * описание ошибки
             */
            message: string;
            /**
             * объекто с полями и массивом ошибок их
             * example:
             * {
             *   "propertyName": [
             *     "message1",
             *     "message2"
             *   ]
             * }
             */
            validationErrors: {
                [key: string]: any;
            };
        }
    }
}
declare namespace Paths {
    namespace AddStoryRequestControllerCreateAddStoryRequestForCurrentUser {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type Authorization = string;
        }
        export type RequestBody = Components.Schemas.CreateAddStoryRequestDto;
        namespace Responses {
            export type $200 = Components.Schemas.AddStoryRequestDto;
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace AddStoryRequestControllerDeleteAddStoryRequestById {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type AddStoryRequestId = number;
            export type Authorization = string;
        }
        export interface PathParameters {
            addStoryRequestId: Parameters.AddStoryRequestId;
        }
        namespace Responses {
            export interface $200 {
            }
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace AddStoryRequestControllerEditStatusAddStoryReqeust {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type AddStoryRequestId = number;
            export type Authorization = string;
        }
        export interface PathParameters {
            addStoryRequestId: Parameters.AddStoryRequestId;
        }
        export type RequestBody = Components.Schemas.EditAddStoryRequestDto;
        namespace Responses {
            export type $200 = Components.Schemas.AddStoryRequestEntity;
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace AddStoryRequestControllerGetAddStoryRequestAll {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type Authorization = string;
            export type Count = number;
            export type Start = number;
        }
        export interface QueryParameters {
            start: Parameters.Start;
            count: Parameters.Count;
        }
        namespace Responses {
            export type $200 = Components.Schemas.AddStoryRequestEntity[];
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace AddStoryRequestControllerGetAddStoryRequestByUserId {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type Authorization = string;
            export type UserId = number;
        }
        export interface PathParameters {
            userId: Parameters.UserId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.AddStoryRequestDto[];
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace AddStoryRequestControllerGetAddStoryRequestForCurrentUser {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type Authorization = string;
        }
        namespace Responses {
            export type $200 = Components.Schemas.AddStoryRequestDto[];
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace AdminControllerAddEthnicalGroupPoint {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type Authorization = string;
            export type ConstituentId = number;
            export type EthnicGroupId = number;
        }
        export interface PathParameters {
            ethnicGroupId: Parameters.EthnicGroupId;
            constituentId: Parameters.ConstituentId;
        }
        export type RequestBody = Components.Schemas.AddEthnicGroupMapDto;
        namespace Responses {
            export type $200 = Components.Schemas.EthnicGroupMapDto;
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace AdminControllerAddStory {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type Authorization = string;
        }
        export type RequestBody = Components.Schemas.AddStoryDto;
        namespace Responses {
            export type $200 = Components.Schemas.StoryWithTextDto;
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace AdminControllerAddTextStory {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type Authorization = string;
        }
        export type RequestBody = Components.Schemas.AddTextStoryDto;
        namespace Responses {
            export type $200 = Components.Schemas.TextStoryDto;
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace AdminControllerDeleteEthnicalGroupPoint {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type Authorization = string;
            export type PointId = number;
        }
        export interface PathParameters {
            pointId: Parameters.PointId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.EthnicGroupMapDto;
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace AdminControllerDeleteStoryById {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type Authorization = string;
            export type StoryId = number;
        }
        export interface PathParameters {
            storyId: Parameters.StoryId;
        }
        namespace Responses {
            export interface $200 {
            }
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace AdminControllerDeleteStoryImgByStoryId {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type Authorization = string;
            export type StoryId = number;
        }
        export interface PathParameters {
            storyId: Parameters.StoryId;
        }
        namespace Responses {
            export interface $200 {
            }
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace AdminControllerDeleteUser {
        namespace Parameters {
            export type UserId = number;
        }
        export interface PathParameters {
            userId: Parameters.UserId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.UserResponseDto;
            export interface $400 {
            }
            export interface $401 {
            }
            export interface $404 {
            }
        }
    }
    namespace AdminControllerDeleteUserAudioById {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type Authorization = string;
            export type UserAudioId = number;
        }
        export interface PathParameters {
            userAudioId: Parameters.UserAudioId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.BaseUserAudioDto;
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace AdminControllerEditSotry {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type Authorization = string;
            export type StoryId = number;
        }
        export interface PathParameters {
            storyId: Parameters.StoryId;
        }
        export type RequestBody = Components.Schemas.EditStoryDto;
        namespace Responses {
            export type $200 = Components.Schemas.StoryDto;
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace AdminControllerSetUserAudioToStory {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type Authorization = string;
            export type StoryId = number;
        }
        export interface PathParameters {
            storyId: Parameters.StoryId;
        }
        export type RequestBody = Components.Schemas.AddAudioStoryDto;
        namespace Responses {
            export interface $200 {
            }
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace AdminControllerUploadAudioStory {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type Authorization = string;
            export type LanguageId = number;
            export type StoryId = number;
        }
        export interface PathParameters {
            storyId: Parameters.StoryId;
            languageId: Parameters.LanguageId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.AudioStoryResponseDto;
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace AdminControllerUploadStoryImage {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type Authorization = string;
            export type StoryId = number;
        }
        export interface PathParameters {
            storyId: Parameters.StoryId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.StoryBookResponseDto;
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace AudioStoryRequestControllerCreateAddAudioRequest {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type Authorization = string;
        }
        export type RequestBody = Components.Schemas.AddAudioStoryApplicationDto;
        namespace Responses {
            export type $200 = Components.Schemas.AudioStoryRequestEntity;
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace AudioStoryRequestControllerDeleteAudioStoryRequestBydId {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type AudioStoryRequestId = number;
            export type Authorization = string;
        }
        export interface PathParameters {
            audioStoryRequestId: Parameters.AudioStoryRequestId;
        }
        namespace Responses {
            export interface $200 {
            }
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace AudioStoryRequestControllerEditAudioStoryRequest {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type AudioStoryReqeustId = number;
            export type Authorization = string;
        }
        export interface PathParameters {
            audioStoryReqeustId: Parameters.AudioStoryReqeustId;
        }
        export type RequestBody = Components.Schemas.EditAudioStoryApplicaitonDto;
        namespace Responses {
            export type $200 = Components.Schemas.AudioApplicationWithUserAudioResponseDto;
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace AudioStoryRequestControllerGetAllAudioStoryReqeustsByUserId {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type Authorization = string;
            export type Page = number;
            export type Take = number;
            export type UserId = number;
        }
        export interface PathParameters {
            userId: Parameters.UserId;
        }
        export interface QueryParameters {
            page?: Parameters.Page;
            take?: Parameters.Take;
        }
        namespace Responses {
            export interface $200 {
                data: Components.Schemas.AudioApplicationWithUserAudioResponseDto[];
                /**
                 * информация о странице
                 */
                meta: {
                    /**
                     * номер текущей страницы
                     */
                    page: number;
                    /**
                     * количество элементов на странице
                     */
                    take: number;
                    /**
                     * количество элементов всего
                     */
                    itemCount: number;
                    /**
                     * количество страниц
                     */
                    pageCount: number;
                    /**
                     * есть предыдущая страница
                     */
                    hasPreviousPage: boolean;
                    /**
                     * есть следующая страница
                     */
                    hasNextPage: boolean;
                };
            }
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace AudioStoryRequestControllerGetAllAudioStoryRequests {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type Authorization = string;
            export type Page = number;
            export type Take = number;
        }
        export interface QueryParameters {
            page?: Parameters.Page;
            take?: Parameters.Take;
        }
        namespace Responses {
            export interface $200 {
                data: Components.Schemas.AudioApplicationWithUserAudioResponseDto[];
                /**
                 * информация о странице
                 */
                meta: {
                    /**
                     * номер текущей страницы
                     */
                    page: number;
                    /**
                     * количество элементов на странице
                     */
                    take: number;
                    /**
                     * количество элементов всего
                     */
                    itemCount: number;
                    /**
                     * количество страниц
                     */
                    pageCount: number;
                    /**
                     * есть предыдущая страница
                     */
                    hasPreviousPage: boolean;
                    /**
                     * есть следующая страница
                     */
                    hasNextPage: boolean;
                };
            }
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace AuthControllerLogout {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type Authorization = string;
        }
        namespace Responses {
            export interface $200 {
            }
            export type $400 = Components.Schemas.BadRequestDto;
            export type $401 = Components.Schemas.BaseRequestExceptionDto;
        }
    }
    namespace AuthControllerRefresh {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type Authorization = string;
        }
        namespace Responses {
            export type $200 = Components.Schemas.TokensResponseDto;
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace AuthControllerSignIn {
        export type RequestBody = Components.Schemas.SignInRequestDto;
        namespace Responses {
            export type $200 = Components.Schemas.TokensResponseDto;
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace AuthControllerSignUp {
        export type RequestBody = Components.Schemas.SignUpRequestDto;
        namespace Responses {
            export type $201 = Components.Schemas.TokensResponseDto;
            export type $400 = Components.Schemas.ValidationExceptionResponseDto;
            export interface $401 {
            }
        }
    }
    namespace ConstituentsControllerAddConstituent {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type Authorization = string;
        }
        export type RequestBody = Components.Schemas.AddConstituentDto;
        namespace Responses {
            export type $200 = Components.Schemas.ConstituentDto;
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace ConstituentsControllerAddEthnicGroupToConstituent {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type Authorization = string;
        }
        export type RequestBody = Components.Schemas.AddEthnicGroupToConstituentDto;
        namespace Responses {
            export type $200 = Components.Schemas.EthnicGroupToConstituentDto;
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace ConstituentsControllerDeleteConstituentById {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type Authorization = string;
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
            }
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace ConstituentsControllerDeleteEthnicGroupFromConstituent {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type Authorization = string;
        }
        export type RequestBody = Components.Schemas.DeleteEthnicGroupToConstituentDto;
        namespace Responses {
            export type $200 = Components.Schemas.EthnicGroupToConstituentDto;
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace ConstituentsControllerEditConstituent {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type Authorization = string;
        }
        export type RequestBody = Components.Schemas.EditConstituentDto;
        namespace Responses {
            export interface $200 {
            }
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace ConstituentsControllerGetConstituents {
        namespace Responses {
            export type $200 = Components.Schemas.ConstituentDto[];
            export interface $400 {
            }
        }
    }
    namespace ConstituentsControllerGetEthnicGroupByConstituentId {
        namespace Parameters {
            export type ConstituentId = number;
        }
        export interface PathParameters {
            constituentId: Parameters.ConstituentId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.EthnicGroupToConstituentDto[];
            export interface $400 {
            }
        }
    }
    namespace EthnicGroupControllerAddEthnicGroup {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type Authorization = string;
        }
        export type RequestBody = Components.Schemas.AddEthnicGroupDto;
        namespace Responses {
            export type $200 = Components.Schemas.EthnicGroupDto;
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace EthnicGroupControllerAddLanguage {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type Authorization = string;
        }
        export type RequestBody = Components.Schemas.AddLanguageDto;
        namespace Responses {
            export type $200 = Components.Schemas.EthnicGroupDto;
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace EthnicGroupControllerDeleteEthnicGroup {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type Authorization = string;
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
            }
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace EthnicGroupControllerDeleteLanguageById {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type Authorization = string;
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
            }
            export interface $400 {
            }
        }
    }
    namespace EthnicGroupControllerEditEthnicGroup {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type Authorization = string;
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.EditEthnicGroupDto;
        namespace Responses {
            export type $200 = Components.Schemas.EthnicGroupDto;
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace EthnicGroupControllerEthnicGroups {
        namespace Responses {
            export type $200 = Components.Schemas.EthnicGroupLanguageDto[];
            export interface $400 {
            }
        }
    }
    namespace EthnicGroupControllerGetAllLanguage {
        namespace Responses {
            export type $200 = Components.Schemas.LanguageDto[];
            export interface $400 {
            }
            export interface $403 {
            }
        }
    }
    namespace EthnicGroupControllerGetEthnicGroupById {
        namespace Parameters {
            export type EthnicGroupId = number;
        }
        export interface PathParameters {
            ethnicGroupId: Parameters.EthnicGroupId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.EthnicGroupDto;
            export interface $400 {
            }
        }
    }
    namespace MapControllerDeleteEthnicalGroupPoint {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type Authorization = string;
            export type PointId = number;
        }
        export interface PathParameters {
            pointId: Parameters.PointId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.EthnicGroupMapDto;
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace MapControllerGetEthnicGroupPointsByName {
        namespace Parameters {
            export type Name = string;
        }
        export interface PathParameters {
            name: Parameters.Name;
        }
        namespace Responses {
            export type $200 = Components.Schemas.EthnicGroupMapPointEntityWithConstituents[];
        }
    }
    namespace MapControllerGetEthnicalGroupPoints {
        namespace Responses {
            export type $200 = Components.Schemas.EthnicGroupMapWithGroupDto[];
            export interface $400 {
            }
        }
    }
    namespace MapControllerGetEthnicalGroupPointsByConstituentId {
        namespace Parameters {
            export type ConstituentId = number;
        }
        export interface PathParameters {
            constituentId: Parameters.ConstituentId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.EthnicGroupMapPointEntity[];
            export interface $400 {
            }
        }
    }
    namespace MapControllerGetMapTopojson {
        namespace Responses {
            export type $200 = Components.Schemas.MapDto;
            export interface $400 {
            }
        }
    }
    namespace MapControllerGetPercentsFilledStoriesByConstituentId {
        namespace Responses {
            export type $200 = Components.Schemas.ConstituentFilledDto[];
            export interface $400 {
            }
        }
    }
    namespace RequestControllerGetStatuses {
        namespace Responses {
            export type $200 = string[];
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace RequestControllerGetTypes {
        namespace Responses {
            export type $200 = string[];
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace StoryControllerAddRatingForStoryByCurrentUser {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type Authorization = string;
        }
        export type RequestBody = Components.Schemas.AddRatingAudioStoryDto;
        namespace Responses {
            export type $200 = Components.Schemas.AddedRatingAudioStoryDto;
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace StoryControllerGetAllStories {
        namespace Parameters {
            export type Page = number;
            export type Take = number;
        }
        export interface QueryParameters {
            page?: Parameters.Page;
            take?: Parameters.Take;
        }
        namespace Responses {
            export interface $200 {
                data: Components.Schemas.StoryBookResponseDto[];
                /**
                 * информация о странице
                 */
                meta: {
                    /**
                     * номер текущей страницы
                     */
                    page: number;
                    /**
                     * количество элементов на странице
                     */
                    take: number;
                    /**
                     * количество элементов всего
                     */
                    itemCount: number;
                    /**
                     * количество страниц
                     */
                    pageCount: number;
                    /**
                     * есть предыдущая страница
                     */
                    hasPreviousPage: boolean;
                    /**
                     * есть следующая страница
                     */
                    hasNextPage: boolean;
                };
            }
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace StoryControllerGetAudioStoryByEthnicGroup {
        namespace Parameters {
            export type EthnicGroupId = number;
        }
        export interface PathParameters {
            ethnicGroupId: Parameters.EthnicGroupId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PreviewAudioStoryResponseDto[];
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace StoryControllerGetAudioStoryById {
        namespace Parameters {
            export type StoryAudioId = number;
        }
        export interface PathParameters {
            storyAudioId: Parameters.StoryAudioId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.StreamableFile;
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace StoryControllerGetAudiosByStoryId {
        namespace Parameters {
            export type StoryId = number;
        }
        export interface PathParameters {
            storyId: Parameters.StoryId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.AudioStoryResponseDto[];
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace StoryControllerGetImgStoryById {
        namespace Parameters {
            export type Filename = string;
            export type StoryId = string;
        }
        export interface PathParameters {
            storyId: Parameters.StoryId;
            filename: Parameters.Filename;
        }
        namespace Responses {
            export type $200 = Components.Schemas.ImageStoryDto;
            export interface $400 {
            }
            export interface $401 {
            }
            export interface $404 {
            }
        }
    }
    namespace StoryControllerGetRatingByAudioId {
        namespace Parameters {
            export type AudioId = number;
        }
        export interface PathParameters {
            audioId: Parameters.AudioId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.RatingAudioStoryDto;
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace StoryControllerGetRatingByAudioIdForCurrentUser {
        namespace Parameters {
            export type UserAudioId = number;
        }
        export interface PathParameters {
            userAudioId: Parameters.UserAudioId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.RatingAudioStoryDto;
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace StoryControllerGetStoriesByAuthorAudioStory {
        namespace Parameters {
            export type UserId = number;
        }
        export interface PathParameters {
            userId: Parameters.UserId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.StoryBookResponseDto[];
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace StoryControllerGetStoriesByEthnicGroupId {
        namespace Parameters {
            export type EthnicGroupId = number;
            export type Page = number;
            export type Take = number;
        }
        export interface PathParameters {
            ethnicGroupId: Parameters.EthnicGroupId;
        }
        export interface QueryParameters {
            page?: Parameters.Page;
            take?: Parameters.Take;
        }
        namespace Responses {
            export interface $200 {
                data: Components.Schemas.StoryBookResponseDto[];
                /**
                 * информация о странице
                 */
                meta: {
                    /**
                     * номер текущей страницы
                     */
                    page: number;
                    /**
                     * количество элементов на странице
                     */
                    take: number;
                    /**
                     * количество элементов всего
                     */
                    itemCount: number;
                    /**
                     * количество страниц
                     */
                    pageCount: number;
                    /**
                     * есть предыдущая страница
                     */
                    hasPreviousPage: boolean;
                    /**
                     * есть следующая страница
                     */
                    hasNextPage: boolean;
                };
            }
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace StoryControllerGetStoriesWithAudiosByEthnicGroupId {
        namespace Parameters {
            export type EthnicGroupId = number;
        }
        export interface PathParameters {
            ethnicGroupId: Parameters.EthnicGroupId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.StoryBookWithAudiosResponseDto[];
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace StoryControllerGetStoryById {
        namespace Parameters {
            export type StoryId = number;
        }
        export interface PathParameters {
            storyId: Parameters.StoryId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.StoryDto;
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace StoryControllerGetStoryByName {
        namespace Parameters {
            export type Name = string;
        }
        export interface PathParameters {
            name: Parameters.Name;
        }
        namespace Responses {
            export type $200 = Components.Schemas.StoryDto[];
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace StoryControllerGetTextStoryByStoryId {
        namespace Parameters {
            export type StoryId = number;
        }
        export interface PathParameters {
            storyId: Parameters.StoryId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.TextStoryDto;
            export interface $400 {
            }
        }
    }
    namespace StoryControllerSearchStoryByName {
        namespace Parameters {
            export type Name = string;
            export type Page = number;
            export type Take = number;
        }
        export interface QueryParameters {
            name?: Parameters.Name;
            page?: Parameters.Page;
            take?: Parameters.Take;
        }
        namespace Responses {
            export interface $200 {
                data: Components.Schemas.StoryBookResponseDto[];
                /**
                 * информация о странице
                 */
                meta: {
                    /**
                     * номер текущей страницы
                     */
                    page: number;
                    /**
                     * количество элементов на странице
                     */
                    take: number;
                    /**
                     * количество элементов всего
                     */
                    itemCount: number;
                    /**
                     * количество страниц
                     */
                    pageCount: number;
                    /**
                     * есть предыдущая страница
                     */
                    hasPreviousPage: boolean;
                    /**
                     * есть следующая страница
                     */
                    hasNextPage: boolean;
                };
            }
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace UserControllerFindUserById {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type Authorization = string;
            export type UserId = number;
        }
        export interface PathParameters {
            userId: Parameters.UserId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.UserResponseDto;
            export interface $400 {
            }
            export interface $401 {
            }
            export interface $404 {
            }
        }
    }
    namespace UserControllerGetAllAudioStoryRequestsCurrentUser {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type Authorization = string;
            export type Page = number;
            export type Take = number;
        }
        export interface QueryParameters {
            page?: Parameters.Page;
            take?: Parameters.Take;
        }
        namespace Responses {
            export interface $200 {
                data: Components.Schemas.AudioApplicationWithUserAudioResponseDto[];
                /**
                 * информация о странице
                 */
                meta: {
                    /**
                     * номер текущей страницы
                     */
                    page: number;
                    /**
                     * количество элементов на странице
                     */
                    take: number;
                    /**
                     * количество элементов всего
                     */
                    itemCount: number;
                    /**
                     * количество страниц
                     */
                    pageCount: number;
                    /**
                     * есть предыдущая страница
                     */
                    hasPreviousPage: boolean;
                    /**
                     * есть следующая страница
                     */
                    hasNextPage: boolean;
                };
            }
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
    namespace UserControllerGetApprovedUserAudiosCurrentUser {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type Authorization = string;
        }
        namespace Responses {
            export type $200 = Components.Schemas.AudioStoryResponseDto[];
            export interface $400 {
            }
        }
    }
    namespace UserControllerGetCurrentUserInfo {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type Authorization = string;
        }
        namespace Responses {
            export type $200 = Components.Schemas.UserResponseDto;
            export interface $400 {
            }
            export interface $401 {
            }
            export interface $404 {
            }
        }
    }
    namespace UserControllerUploadUserAudio {
        export interface HeaderParameters {
            authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type Authorization = string;
            export type LanguageId = number;
            export type StoryId = number;
        }
        export interface PathParameters {
            languageId: Parameters.LanguageId;
            storyId: Parameters.StoryId;
        }
        export interface RequestBody {
            file?: string; // binary
        }
        namespace Responses {
            export type $200 = Components.Schemas.UserAudioResponseDto;
            export interface $400 {
            }
            export interface $401 {
            }
        }
    }
}

export interface OperationMethods {
  /**
   * AuthController_signUp - регистрация
   */
  'AuthController_signUp'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AuthControllerSignUp.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AuthControllerSignUp.Responses.$201>
  /**
   * AuthController_signIn - вход
   */
  'AuthController_signIn'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AuthControllerSignIn.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AuthControllerSignIn.Responses.$200>
  /**
   * AuthController_refresh - обновление access token
   */
  'AuthController_refresh'(
    parameters?: Parameters<Paths.AuthControllerRefresh.HeaderParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AuthControllerRefresh.Responses.$200>
  /**
   * AuthController_logout - выход из системы
   */
  'AuthController_logout'(
    parameters?: Parameters<Paths.AuthControllerLogout.HeaderParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AuthControllerLogout.Responses.$200>
  /**
   * UserController_getCurrentUserInfo - получение информации о текущем пользователе
   */
  'UserController_getCurrentUserInfo'(
    parameters?: Parameters<Paths.UserControllerGetCurrentUserInfo.HeaderParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserControllerGetCurrentUserInfo.Responses.$200>
  /**
   * UserController_getApprovedUserAudiosCurrentUser - получение одобренных озвучек текущего пользователя
   */
  'UserController_getApprovedUserAudiosCurrentUser'(
    parameters?: Parameters<Paths.UserControllerGetApprovedUserAudiosCurrentUser.HeaderParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserControllerGetApprovedUserAudiosCurrentUser.Responses.$200>
  /**
   * UserController_findUserById - получение информации о пользователе по его id
   * 
   * необходима роль администратора
   */
  'UserController_findUserById'(
    parameters?: Parameters<Paths.UserControllerFindUserById.PathParameters & Paths.UserControllerFindUserById.HeaderParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserControllerFindUserById.Responses.$200>
  /**
   * UserController_uploadUserAudio - загрузка озвучки пользователя
   * 
   * файл прикрепляется к полю audio
   */
  'UserController_uploadUserAudio'(
    parameters?: Parameters<Paths.UserControllerUploadUserAudio.PathParameters & Paths.UserControllerUploadUserAudio.HeaderParameters> | null,
    data?: Paths.UserControllerUploadUserAudio.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserControllerUploadUserAudio.Responses.$200>
  /**
   * UserController_getAllAudioStoryRequestsCurrentUser - получение всех заявок на озвучки текущего пользователя
   */
  'UserController_getAllAudioStoryRequestsCurrentUser'(
    parameters?: Parameters<Paths.UserControllerGetAllAudioStoryRequestsCurrentUser.QueryParameters & Paths.UserControllerGetAllAudioStoryRequestsCurrentUser.HeaderParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserControllerGetAllAudioStoryRequestsCurrentUser.Responses.$200>
  /**
   * StoryController_getAllStories - получение всех сказок
   */
  'StoryController_getAllStories'(
    parameters?: Parameters<Paths.StoryControllerGetAllStories.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.StoryControllerGetAllStories.Responses.$200>
  /**
   * StoryController_searchStoryByName - поиск сказки по имени
   * 
   * для работы с websockets используется событие searchStoryByName для отправления запроса и searchResultStoryByName для получения результатов
   */
  'StoryController_searchStoryByName'(
    parameters?: Parameters<Paths.StoryControllerSearchStoryByName.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.StoryControllerSearchStoryByName.Responses.$200>
  /**
   * StoryController_getStoriesByEthnicGroupId - получение всех сказок выбранной этнической группы
   */
  'StoryController_getStoriesByEthnicGroupId'(
    parameters?: Parameters<Paths.StoryControllerGetStoriesByEthnicGroupId.PathParameters & Paths.StoryControllerGetStoriesByEthnicGroupId.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.StoryControllerGetStoriesByEthnicGroupId.Responses.$200>
  /**
   * StoryController_getStoriesWithAudiosByEthnicGroupId - получение всех сказок выбранной этнической группы и озвучек для них
   */
  'StoryController_getStoriesWithAudiosByEthnicGroupId'(
    parameters?: Parameters<Paths.StoryControllerGetStoriesWithAudiosByEthnicGroupId.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.StoryControllerGetStoriesWithAudiosByEthnicGroupId.Responses.$200>
  /**
   * StoryController_getStoriesByAuthorAudioStory - получение сказок, которые озвучил пользователь
   */
  'StoryController_getStoriesByAuthorAudioStory'(
    parameters?: Parameters<Paths.StoryControllerGetStoriesByAuthorAudioStory.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.StoryControllerGetStoriesByAuthorAudioStory.Responses.$200>
  /**
   * StoryController_getStoryByName - получение сказок в которых есть подстрока name
   */
  'StoryController_getStoryByName'(
    parameters?: Parameters<Paths.StoryControllerGetStoryByName.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.StoryControllerGetStoryByName.Responses.$200>
  /**
   * StoryController_getStoryById - получение общей информации о выбранной сказке
   */
  'StoryController_getStoryById'(
    parameters?: Parameters<Paths.StoryControllerGetStoryById.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.StoryControllerGetStoryById.Responses.$200>
  /**
   * StoryController_getAudiosByStoryId - получение одобренных озвучек для выбранной сказки
   */
  'StoryController_getAudiosByStoryId'(
    parameters?: Parameters<Paths.StoryControllerGetAudiosByStoryId.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.StoryControllerGetAudiosByStoryId.Responses.$200>
  /**
   * StoryController_getTextStoryByStoryId - получение текста сказки
   */
  'StoryController_getTextStoryByStoryId'(
    parameters?: Parameters<Paths.StoryControllerGetTextStoryByStoryId.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.StoryControllerGetTextStoryByStoryId.Responses.$200>
  /**
   * StoryController_getAudioStoryById - получение одобренной озвучки по audioId
   * 
   * возвращает StreamableFile
   */
  'StoryController_getAudioStoryById'(
    parameters?: Parameters<Paths.StoryControllerGetAudioStoryById.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.StoryControllerGetAudioStoryById.Responses.$200>
  /**
   * StoryController_getAudioStoryByEthnicGroup - получение аудиокниг для выбранной этнической группы
   */
  'StoryController_getAudioStoryByEthnicGroup'(
    parameters?: Parameters<Paths.StoryControllerGetAudioStoryByEthnicGroup.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.StoryControllerGetAudioStoryByEthnicGroup.Responses.$200>
  /**
   * StoryController_getImgStoryById - получение обложки для сказки по storyId
   */
  'StoryController_getImgStoryById'(
    parameters?: Parameters<Paths.StoryControllerGetImgStoryById.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.StoryControllerGetImgStoryById.Responses.$200>
  /**
   * StoryController_getRatingByAudioId - получение оценки для выбранной озвучки
   */
  'StoryController_getRatingByAudioId'(
    parameters?: Parameters<Paths.StoryControllerGetRatingByAudioId.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.StoryControllerGetRatingByAudioId.Responses.$200>
  /**
   * StoryController_getRatingByAudioIdForCurrentUser - получение оценки для выбранной озвучки для текущего пользователя
   */
  'StoryController_getRatingByAudioIdForCurrentUser'(
    parameters?: Parameters<Paths.StoryControllerGetRatingByAudioIdForCurrentUser.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.StoryControllerGetRatingByAudioIdForCurrentUser.Responses.$200>
  /**
   * StoryController_addRatingForStoryByCurrentUser - добавление текущим пользователем оценки к озвучке по audioId
   */
  'StoryController_addRatingForStoryByCurrentUser'(
    parameters?: Parameters<Paths.StoryControllerAddRatingForStoryByCurrentUser.HeaderParameters> | null,
    data?: Paths.StoryControllerAddRatingForStoryByCurrentUser.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.StoryControllerAddRatingForStoryByCurrentUser.Responses.$200>
  /**
   * AudioStoryRequestController_getAllAudioStoryRequests - получение всех заявок на озвучки
   * 
   * необходимы роль модератора
   */
  'AudioStoryRequestController_getAllAudioStoryRequests'(
    parameters?: Parameters<Paths.AudioStoryRequestControllerGetAllAudioStoryRequests.QueryParameters & Paths.AudioStoryRequestControllerGetAllAudioStoryRequests.HeaderParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AudioStoryRequestControllerGetAllAudioStoryRequests.Responses.$200>
  /**
   * AudioStoryRequestController_getAllAudioStoryReqeustsByUserId - получение всех заявок на озвучки для выбранного пользователя.
   * 
   * Необходима роль модератора
   */
  'AudioStoryRequestController_getAllAudioStoryReqeustsByUserId'(
    parameters?: Parameters<Paths.AudioStoryRequestControllerGetAllAudioStoryReqeustsByUserId.PathParameters & Paths.AudioStoryRequestControllerGetAllAudioStoryReqeustsByUserId.QueryParameters & Paths.AudioStoryRequestControllerGetAllAudioStoryReqeustsByUserId.HeaderParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AudioStoryRequestControllerGetAllAudioStoryReqeustsByUserId.Responses.$200>
  /**
   * AudioStoryRequestController_createAddAudioRequest - Создание заявки на проверку озвучки
   */
  'AudioStoryRequestController_createAddAudioRequest'(
    parameters?: Parameters<Paths.AudioStoryRequestControllerCreateAddAudioRequest.HeaderParameters> | null,
    data?: Paths.AudioStoryRequestControllerCreateAddAudioRequest.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AudioStoryRequestControllerCreateAddAudioRequest.Responses.$200>
  /**
   * AudioStoryRequestController_editAudioStoryRequest - редактирование заявки на проверку озвучки
   * 
   * необходима роль модератора или администратора. после редактирования, отредактированная запись по вебсокету отправляется пользователю из userId(создавшему заявку) в событие с названием "statuses"
   */
  'AudioStoryRequestController_editAudioStoryRequest'(
    parameters?: Parameters<Paths.AudioStoryRequestControllerEditAudioStoryRequest.PathParameters & Paths.AudioStoryRequestControllerEditAudioStoryRequest.HeaderParameters> | null,
    data?: Paths.AudioStoryRequestControllerEditAudioStoryRequest.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AudioStoryRequestControllerEditAudioStoryRequest.Responses.$200>
  /**
   * AudioStoryRequestController_deleteAudioStoryRequestBydId - удаление заявки на проверку озвучки
   * 
   * необходима роль администратора
   */
  'AudioStoryRequestController_deleteAudioStoryRequestBydId'(
    parameters?: Parameters<Paths.AudioStoryRequestControllerDeleteAudioStoryRequestBydId.PathParameters & Paths.AudioStoryRequestControllerDeleteAudioStoryRequestBydId.HeaderParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AudioStoryRequestControllerDeleteAudioStoryRequestBydId.Responses.$200>
  /**
   * ConstituentsController_addConstituent - добавление субъекта РФ
   * 
   * необходима роль администратора
   */
  'ConstituentsController_addConstituent'(
    parameters?: Parameters<Paths.ConstituentsControllerAddConstituent.HeaderParameters> | null,
    data?: Paths.ConstituentsControllerAddConstituent.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ConstituentsControllerAddConstituent.Responses.$200>
  /**
   * ConstituentsController_addEthnicGroupToConstituent - добавление этнической группы к субъекту рф
   * 
   * небходима роль администратора
   */
  'ConstituentsController_addEthnicGroupToConstituent'(
    parameters?: Parameters<Paths.ConstituentsControllerAddEthnicGroupToConstituent.HeaderParameters> | null,
    data?: Paths.ConstituentsControllerAddEthnicGroupToConstituent.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ConstituentsControllerAddEthnicGroupToConstituent.Responses.$200>
  /**
   * ConstituentsController_deleteEthnicGroupFromConstituent - удаление этнической группы у субъекта рф
   * 
   * необходима роль администратора
   */
  'ConstituentsController_deleteEthnicGroupFromConstituent'(
    parameters?: Parameters<Paths.ConstituentsControllerDeleteEthnicGroupFromConstituent.HeaderParameters> | null,
    data?: Paths.ConstituentsControllerDeleteEthnicGroupFromConstituent.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ConstituentsControllerDeleteEthnicGroupFromConstituent.Responses.$200>
  /**
   * ConstituentsController_getEthnicGroupByConstituentId - получение этнической группы, принадлежащей субъекту рф
   */
  'ConstituentsController_getEthnicGroupByConstituentId'(
    parameters?: Parameters<Paths.ConstituentsControllerGetEthnicGroupByConstituentId.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ConstituentsControllerGetEthnicGroupByConstituentId.Responses.$200>
  /**
   * ConstituentsController_getConstituents - получение всех субъектов
   */
  'ConstituentsController_getConstituents'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ConstituentsControllerGetConstituents.Responses.$200>
  /**
   * ConstituentsController_editConstituent - редактирование субъекта
   * 
   * небходима роль администратора
   */
  'ConstituentsController_editConstituent'(
    parameters?: Parameters<Paths.ConstituentsControllerEditConstituent.HeaderParameters> | null,
    data?: Paths.ConstituentsControllerEditConstituent.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ConstituentsControllerEditConstituent.Responses.$200>
  /**
   * ConstituentsController_deleteConstituentById - удаление данных субъекта
   * 
   * необходима роль администратора
   */
  'ConstituentsController_deleteConstituentById'(
    parameters?: Parameters<Paths.ConstituentsControllerDeleteConstituentById.PathParameters & Paths.ConstituentsControllerDeleteConstituentById.HeaderParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ConstituentsControllerDeleteConstituentById.Responses.$200>
  /**
   * EthnicGroupController_addEthnicGroup - добавление этнической группы
   * 
   * необходима роль администратора
   */
  'EthnicGroupController_addEthnicGroup'(
    parameters?: Parameters<Paths.EthnicGroupControllerAddEthnicGroup.HeaderParameters> | null,
    data?: Paths.EthnicGroupControllerAddEthnicGroup.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.EthnicGroupControllerAddEthnicGroup.Responses.$200>
  /**
   * EthnicGroupController_ethnicGroups - получение списка этнических групп
   */
  'EthnicGroupController_ethnicGroups'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.EthnicGroupControllerEthnicGroups.Responses.$200>
  /**
   * EthnicGroupController_getEthnicGroupById - получение этнической группы по ethnicGroupId
   */
  'EthnicGroupController_getEthnicGroupById'(
    parameters?: Parameters<Paths.EthnicGroupControllerGetEthnicGroupById.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.EthnicGroupControllerGetEthnicGroupById.Responses.$200>
  /**
   * EthnicGroupController_editEthnicGroup - редактирование этнической группы
   * 
   * необходима роль администратора
   */
  'EthnicGroupController_editEthnicGroup'(
    parameters?: Parameters<Paths.EthnicGroupControllerEditEthnicGroup.PathParameters & Paths.EthnicGroupControllerEditEthnicGroup.HeaderParameters> | null,
    data?: Paths.EthnicGroupControllerEditEthnicGroup.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.EthnicGroupControllerEditEthnicGroup.Responses.$200>
  /**
   * EthnicGroupController_deleteEthnicGroup - удаление этнической группы
   * 
   * необходима роль администратора
   */
  'EthnicGroupController_deleteEthnicGroup'(
    parameters?: Parameters<Paths.EthnicGroupControllerDeleteEthnicGroup.PathParameters & Paths.EthnicGroupControllerDeleteEthnicGroup.HeaderParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.EthnicGroupControllerDeleteEthnicGroup.Responses.$200>
  /**
   * EthnicGroupController_addLanguage - добавление языка этнической группы
   * 
   * необходима роль администратора
   */
  'EthnicGroupController_addLanguage'(
    parameters?: Parameters<Paths.EthnicGroupControllerAddLanguage.HeaderParameters> | null,
    data?: Paths.EthnicGroupControllerAddLanguage.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.EthnicGroupControllerAddLanguage.Responses.$200>
  /**
   * EthnicGroupController_getAllLanguage - получение списка всех языков
   */
  'EthnicGroupController_getAllLanguage'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.EthnicGroupControllerGetAllLanguage.Responses.$200>
  /**
   * EthnicGroupController_deleteLanguageById - удаление языка по id
   * 
   * необходима роль администратора
   */
  'EthnicGroupController_deleteLanguageById'(
    parameters?: Parameters<Paths.EthnicGroupControllerDeleteLanguageById.PathParameters & Paths.EthnicGroupControllerDeleteLanguageById.HeaderParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.EthnicGroupControllerDeleteLanguageById.Responses.$200>
  /**
   * MapController_getMapTopojson - получить данные для отрисовки карты
   */
  'MapController_getMapTopojson'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.MapControllerGetMapTopojson.Responses.$200>
  /**
   * MapController_getEthnicalGroupPoints - получение точек этнических групп на карте
   */
  'MapController_getEthnicalGroupPoints'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.MapControllerGetEthnicalGroupPoints.Responses.$200>
  /**
   * MapController_getEthnicalGroupPointsByConstituentId - получение точек этнических групп по номеру региона
   */
  'MapController_getEthnicalGroupPointsByConstituentId'(
    parameters?: Parameters<Paths.MapControllerGetEthnicalGroupPointsByConstituentId.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.MapControllerGetEthnicalGroupPointsByConstituentId.Responses.$200>
  /**
   * MapController_getEthnicGroupPointsByName - получение точек этнических групп по названию этнической группы
   */
  'MapController_getEthnicGroupPointsByName'(
    parameters?: Parameters<Paths.MapControllerGetEthnicGroupPointsByName.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.MapControllerGetEthnicGroupPointsByName.Responses.$200>
  /**
   * MapController_deleteEthnicalGroupPoint - удаление точки этнической группы
   * 
   * необходима роль администратора
   */
  'MapController_deleteEthnicalGroupPoint'(
    parameters?: Parameters<Paths.MapControllerDeleteEthnicalGroupPoint.PathParameters & Paths.MapControllerDeleteEthnicalGroupPoint.HeaderParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.MapControllerDeleteEthnicalGroupPoint.Responses.$200>
  /**
   * MapController_getPercentsFilledStoriesByConstituentId - получение списка субъектов и их заполненности озвучками
   */
  'MapController_getPercentsFilledStoriesByConstituentId'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.MapControllerGetPercentsFilledStoriesByConstituentId.Responses.$200>
  /**
   * RequestController_getStatuses - получение существующих статусов для заявок
   */
  'RequestController_getStatuses'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RequestControllerGetStatuses.Responses.$200>
  /**
   * RequestController_getTypes - получение существующих типов заявок
   */
  'RequestController_getTypes'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RequestControllerGetTypes.Responses.$200>
  /**
   * AddStoryRequestController_getAddStoryRequestAll - получение всех заявок на добавление сказки
   * 
   * необходима роль администратора. пример запроса: /api/add-story-request/all?start=1&count=10
   */
  'AddStoryRequestController_getAddStoryRequestAll'(
    parameters?: Parameters<Paths.AddStoryRequestControllerGetAddStoryRequestAll.QueryParameters & Paths.AddStoryRequestControllerGetAddStoryRequestAll.HeaderParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AddStoryRequestControllerGetAddStoryRequestAll.Responses.$200>
  /**
   * AddStoryRequestController_getAddStoryRequestForCurrentUser - получение всех заявок на добавление сказки от текущего пользователя
   */
  'AddStoryRequestController_getAddStoryRequestForCurrentUser'(
    parameters?: Parameters<Paths.AddStoryRequestControllerGetAddStoryRequestForCurrentUser.HeaderParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AddStoryRequestControllerGetAddStoryRequestForCurrentUser.Responses.$200>
  /**
   * AddStoryRequestController_getAddStoryRequestByUserId - получение всех заявок на добавление сказки для выбранного пользователя
   * 
   * необходима роль администратора.
   */
  'AddStoryRequestController_getAddStoryRequestByUserId'(
    parameters?: Parameters<Paths.AddStoryRequestControllerGetAddStoryRequestByUserId.PathParameters & Paths.AddStoryRequestControllerGetAddStoryRequestByUserId.HeaderParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AddStoryRequestControllerGetAddStoryRequestByUserId.Responses.$200>
  /**
   * AddStoryRequestController_createAddStoryRequestForCurrentUser - создание заявки на добавление сказки
   */
  'AddStoryRequestController_createAddStoryRequestForCurrentUser'(
    parameters?: Parameters<Paths.AddStoryRequestControllerCreateAddStoryRequestForCurrentUser.HeaderParameters> | null,
    data?: Paths.AddStoryRequestControllerCreateAddStoryRequestForCurrentUser.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AddStoryRequestControllerCreateAddStoryRequestForCurrentUser.Responses.$200>
  /**
   * AddStoryRequestController_editStatusAddStoryReqeust - обновление заявки
   * 
   * необходима роль администратора. статус заявки берется из /api/request/status/all | Необходима роль moder | После успешного редактирования данные заявки так же передаются пользователю с userId по веб-сокету
   */
  'AddStoryRequestController_editStatusAddStoryReqeust'(
    parameters?: Parameters<Paths.AddStoryRequestControllerEditStatusAddStoryReqeust.PathParameters & Paths.AddStoryRequestControllerEditStatusAddStoryReqeust.HeaderParameters> | null,
    data?: Paths.AddStoryRequestControllerEditStatusAddStoryReqeust.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AddStoryRequestControllerEditStatusAddStoryReqeust.Responses.$200>
  /**
   * AddStoryRequestController_deleteAddStoryRequestById - удаление заявки
   * 
   * Необходима роль администратора
   */
  'AddStoryRequestController_deleteAddStoryRequestById'(
    parameters?: Parameters<Paths.AddStoryRequestControllerDeleteAddStoryRequestById.PathParameters & Paths.AddStoryRequestControllerDeleteAddStoryRequestById.HeaderParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AddStoryRequestControllerDeleteAddStoryRequestById.Responses.$200>
  /**
   * AdminController_addEthnicalGroupPoint - добавление точки этнической группы на карту
   * 
   * необходима роль администратора
   */
  'AdminController_addEthnicalGroupPoint'(
    parameters?: Parameters<Paths.AdminControllerAddEthnicalGroupPoint.PathParameters & Paths.AdminControllerAddEthnicalGroupPoint.HeaderParameters> | null,
    data?: Paths.AdminControllerAddEthnicalGroupPoint.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AdminControllerAddEthnicalGroupPoint.Responses.$200>
  /**
   * AdminController_deleteEthnicalGroupPoint - удаление точки этнической группы
   * 
   * необходима роль администратора
   */
  'AdminController_deleteEthnicalGroupPoint'(
    parameters?: Parameters<Paths.AdminControllerDeleteEthnicalGroupPoint.PathParameters & Paths.AdminControllerDeleteEthnicalGroupPoint.HeaderParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AdminControllerDeleteEthnicalGroupPoint.Responses.$200>
  /**
   * AdminController_addStory - добавление сказки
   */
  'AdminController_addStory'(
    parameters?: Parameters<Paths.AdminControllerAddStory.HeaderParameters> | null,
    data?: Paths.AdminControllerAddStory.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AdminControllerAddStory.Responses.$200>
  /**
   * AdminController_editSotry - редактирование сказки
   */
  'AdminController_editSotry'(
    parameters?: Parameters<Paths.AdminControllerEditSotry.PathParameters & Paths.AdminControllerEditSotry.HeaderParameters> | null,
    data?: Paths.AdminControllerEditSotry.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AdminControllerEditSotry.Responses.$200>
  /**
   * AdminController_deleteStoryById - удаление сказки
   */
  'AdminController_deleteStoryById'(
    parameters?: Parameters<Paths.AdminControllerDeleteStoryById.PathParameters & Paths.AdminControllerDeleteStoryById.HeaderParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AdminControllerDeleteStoryById.Responses.$200>
  /**
   * AdminController_addTextStory - добавление текста сказки
   */
  'AdminController_addTextStory'(
    parameters?: Parameters<Paths.AdminControllerAddTextStory.HeaderParameters> | null,
    data?: Paths.AdminControllerAddTextStory.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AdminControllerAddTextStory.Responses.$200>
  /**
   * AdminController_setUserAudioToStory - добавление озвучки к сказке
   */
  'AdminController_setUserAudioToStory'(
    parameters?: Parameters<Paths.AdminControllerSetUserAudioToStory.PathParameters & Paths.AdminControllerSetUserAudioToStory.HeaderParameters> | null,
    data?: Paths.AdminControllerSetUserAudioToStory.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AdminControllerSetUserAudioToStory.Responses.$200>
  /**
   * AdminController_uploadAudioStory - загрузка озвучки для сказки
   */
  'AdminController_uploadAudioStory'(
    parameters?: Parameters<Paths.AdminControllerUploadAudioStory.PathParameters & Paths.AdminControllerUploadAudioStory.HeaderParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AdminControllerUploadAudioStory.Responses.$200>
  /**
   * AdminController_uploadStoryImage - загрузка обложки для выбранной сказки
   */
  'AdminController_uploadStoryImage'(
    parameters?: Parameters<Paths.AdminControllerUploadStoryImage.PathParameters & Paths.AdminControllerUploadStoryImage.HeaderParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AdminControllerUploadStoryImage.Responses.$200>
  /**
   * AdminController_deleteStoryImgByStoryId - удаление обложки для выбранной сказки
   */
  'AdminController_deleteStoryImgByStoryId'(
    parameters?: Parameters<Paths.AdminControllerDeleteStoryImgByStoryId.PathParameters & Paths.AdminControllerDeleteStoryImgByStoryId.HeaderParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AdminControllerDeleteStoryImgByStoryId.Responses.$200>
  /**
   * AdminController_deleteUserAudioById - удаление озвучки пользователя
   * 
   * необходима роль администратора
   */
  'AdminController_deleteUserAudioById'(
    parameters?: Parameters<Paths.AdminControllerDeleteUserAudioById.PathParameters & Paths.AdminControllerDeleteUserAudioById.HeaderParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AdminControllerDeleteUserAudioById.Responses.$200>
  /**
   * AdminController_deleteUser - удаление пользователя по его id
   * 
   * необходима роль администратора
   */
  'AdminController_deleteUser'(
    parameters?: Parameters<Paths.AdminControllerDeleteUser.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AdminControllerDeleteUser.Responses.$200>
}

export interface PathsDictionary {
  ['/api/auth/signup']: {
    /**
     * AuthController_signUp - регистрация
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AuthControllerSignUp.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AuthControllerSignUp.Responses.$201>
  }
  ['/api/auth/signin']: {
    /**
     * AuthController_signIn - вход
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AuthControllerSignIn.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AuthControllerSignIn.Responses.$200>
  }
  ['/api/auth/refresh']: {
    /**
     * AuthController_refresh - обновление access token
     */
    'post'(
      parameters?: Parameters<Paths.AuthControllerRefresh.HeaderParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AuthControllerRefresh.Responses.$200>
  }
  ['/api/auth/logout']: {
    /**
     * AuthController_logout - выход из системы
     */
    'post'(
      parameters?: Parameters<Paths.AuthControllerLogout.HeaderParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AuthControllerLogout.Responses.$200>
  }
  ['/api/user/me']: {
    /**
     * UserController_getCurrentUserInfo - получение информации о текущем пользователе
     */
    'get'(
      parameters?: Parameters<Paths.UserControllerGetCurrentUserInfo.HeaderParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserControllerGetCurrentUserInfo.Responses.$200>
  }
  ['/api/user/audio/approved/my']: {
    /**
     * UserController_getApprovedUserAudiosCurrentUser - получение одобренных озвучек текущего пользователя
     */
    'get'(
      parameters?: Parameters<Paths.UserControllerGetApprovedUserAudiosCurrentUser.HeaderParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserControllerGetApprovedUserAudiosCurrentUser.Responses.$200>
  }
  ['/api/user/{userId}']: {
    /**
     * UserController_findUserById - получение информации о пользователе по его id
     * 
     * необходима роль администратора
     */
    'get'(
      parameters?: Parameters<Paths.UserControllerFindUserById.PathParameters & Paths.UserControllerFindUserById.HeaderParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserControllerFindUserById.Responses.$200>
  }
  ['/api/user/story/{storyId}/language/{languageId}/audio/upload']: {
    /**
     * UserController_uploadUserAudio - загрузка озвучки пользователя
     * 
     * файл прикрепляется к полю audio
     */
    'post'(
      parameters?: Parameters<Paths.UserControllerUploadUserAudio.PathParameters & Paths.UserControllerUploadUserAudio.HeaderParameters> | null,
      data?: Paths.UserControllerUploadUserAudio.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserControllerUploadUserAudio.Responses.$200>
  }
  ['/api/user/story/audio/request/my']: {
    /**
     * UserController_getAllAudioStoryRequestsCurrentUser - получение всех заявок на озвучки текущего пользователя
     */
    'get'(
      parameters?: Parameters<Paths.UserControllerGetAllAudioStoryRequestsCurrentUser.QueryParameters & Paths.UserControllerGetAllAudioStoryRequestsCurrentUser.HeaderParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserControllerGetAllAudioStoryRequestsCurrentUser.Responses.$200>
  }
  ['/api/story/all']: {
    /**
     * StoryController_getAllStories - получение всех сказок
     */
    'get'(
      parameters?: Parameters<Paths.StoryControllerGetAllStories.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.StoryControllerGetAllStories.Responses.$200>
  }
  ['/api/story/search']: {
    /**
     * StoryController_searchStoryByName - поиск сказки по имени
     * 
     * для работы с websockets используется событие searchStoryByName для отправления запроса и searchResultStoryByName для получения результатов
     */
    'get'(
      parameters?: Parameters<Paths.StoryControllerSearchStoryByName.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.StoryControllerSearchStoryByName.Responses.$200>
  }
  ['/api/story/ethnic-group/{ethnicGroupId}']: {
    /**
     * StoryController_getStoriesByEthnicGroupId - получение всех сказок выбранной этнической группы
     */
    'get'(
      parameters?: Parameters<Paths.StoryControllerGetStoriesByEthnicGroupId.PathParameters & Paths.StoryControllerGetStoriesByEthnicGroupId.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.StoryControllerGetStoriesByEthnicGroupId.Responses.$200>
  }
  ['/api/story/ethnic-group/books/{ethnicGroupId}']: {
    /**
     * StoryController_getStoriesWithAudiosByEthnicGroupId - получение всех сказок выбранной этнической группы и озвучек для них
     */
    'get'(
      parameters?: Parameters<Paths.StoryControllerGetStoriesWithAudiosByEthnicGroupId.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.StoryControllerGetStoriesWithAudiosByEthnicGroupId.Responses.$200>
  }
  ['/api/story/audio/user/{userId}']: {
    /**
     * StoryController_getStoriesByAuthorAudioStory - получение сказок, которые озвучил пользователь
     */
    'get'(
      parameters?: Parameters<Paths.StoryControllerGetStoriesByAuthorAudioStory.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.StoryControllerGetStoriesByAuthorAudioStory.Responses.$200>
  }
  ['/api/story/by-name/{name}']: {
    /**
     * StoryController_getStoryByName - получение сказок в которых есть подстрока name
     */
    'get'(
      parameters?: Parameters<Paths.StoryControllerGetStoryByName.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.StoryControllerGetStoryByName.Responses.$200>
  }
  ['/api/story/{storyId}']: {
    /**
     * StoryController_getStoryById - получение общей информации о выбранной сказке
     */
    'get'(
      parameters?: Parameters<Paths.StoryControllerGetStoryById.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.StoryControllerGetStoryById.Responses.$200>
  }
  ['/api/story/{storyId}/audio/all']: {
    /**
     * StoryController_getAudiosByStoryId - получение одобренных озвучек для выбранной сказки
     */
    'get'(
      parameters?: Parameters<Paths.StoryControllerGetAudiosByStoryId.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.StoryControllerGetAudiosByStoryId.Responses.$200>
  }
  ['/api/story/text/{storyId}']: {
    /**
     * StoryController_getTextStoryByStoryId - получение текста сказки
     */
    'get'(
      parameters?: Parameters<Paths.StoryControllerGetTextStoryByStoryId.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.StoryControllerGetTextStoryByStoryId.Responses.$200>
  }
  ['/api/story/audio/{storyAudioId}']: {
    /**
     * StoryController_getAudioStoryById - получение одобренной озвучки по audioId
     * 
     * возвращает StreamableFile
     */
    'get'(
      parameters?: Parameters<Paths.StoryControllerGetAudioStoryById.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.StoryControllerGetAudioStoryById.Responses.$200>
  }
  ['/api/story/audio/ethnic-group/{ethnicGroupId}']: {
    /**
     * StoryController_getAudioStoryByEthnicGroup - получение аудиокниг для выбранной этнической группы
     */
    'get'(
      parameters?: Parameters<Paths.StoryControllerGetAudioStoryByEthnicGroup.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.StoryControllerGetAudioStoryByEthnicGroup.Responses.$200>
  }
  ['/api/story/{storyId}/image/{filename}']: {
    /**
     * StoryController_getImgStoryById - получение обложки для сказки по storyId
     */
    'get'(
      parameters?: Parameters<Paths.StoryControllerGetImgStoryById.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.StoryControllerGetImgStoryById.Responses.$200>
  }
  ['/api/story/rating/{audioId}']: {
    /**
     * StoryController_getRatingByAudioId - получение оценки для выбранной озвучки
     */
    'get'(
      parameters?: Parameters<Paths.StoryControllerGetRatingByAudioId.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.StoryControllerGetRatingByAudioId.Responses.$200>
  }
  ['/api/story/rating/my/{userAudioId}']: {
    /**
     * StoryController_getRatingByAudioIdForCurrentUser - получение оценки для выбранной озвучки для текущего пользователя
     */
    'get'(
      parameters?: Parameters<Paths.StoryControllerGetRatingByAudioIdForCurrentUser.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.StoryControllerGetRatingByAudioIdForCurrentUser.Responses.$200>
  }
  ['/api/story/rating/add']: {
    /**
     * StoryController_addRatingForStoryByCurrentUser - добавление текущим пользователем оценки к озвучке по audioId
     */
    'post'(
      parameters?: Parameters<Paths.StoryControllerAddRatingForStoryByCurrentUser.HeaderParameters> | null,
      data?: Paths.StoryControllerAddRatingForStoryByCurrentUser.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.StoryControllerAddRatingForStoryByCurrentUser.Responses.$200>
  }
  ['/api/audio-story-request/all']: {
    /**
     * AudioStoryRequestController_getAllAudioStoryRequests - получение всех заявок на озвучки
     * 
     * необходимы роль модератора
     */
    'get'(
      parameters?: Parameters<Paths.AudioStoryRequestControllerGetAllAudioStoryRequests.QueryParameters & Paths.AudioStoryRequestControllerGetAllAudioStoryRequests.HeaderParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AudioStoryRequestControllerGetAllAudioStoryRequests.Responses.$200>
  }
  ['/api/audio-story-request/by-user/{userId}']: {
    /**
     * AudioStoryRequestController_getAllAudioStoryReqeustsByUserId - получение всех заявок на озвучки для выбранного пользователя.
     * 
     * Необходима роль модератора
     */
    'get'(
      parameters?: Parameters<Paths.AudioStoryRequestControllerGetAllAudioStoryReqeustsByUserId.PathParameters & Paths.AudioStoryRequestControllerGetAllAudioStoryReqeustsByUserId.QueryParameters & Paths.AudioStoryRequestControllerGetAllAudioStoryReqeustsByUserId.HeaderParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AudioStoryRequestControllerGetAllAudioStoryReqeustsByUserId.Responses.$200>
  }
  ['/api/audio-story-request/add']: {
    /**
     * AudioStoryRequestController_createAddAudioRequest - Создание заявки на проверку озвучки
     */
    'post'(
      parameters?: Parameters<Paths.AudioStoryRequestControllerCreateAddAudioRequest.HeaderParameters> | null,
      data?: Paths.AudioStoryRequestControllerCreateAddAudioRequest.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AudioStoryRequestControllerCreateAddAudioRequest.Responses.$200>
  }
  ['/api/audio-story-request/edit/{audioStoryReqeustId}']: {
    /**
     * AudioStoryRequestController_editAudioStoryRequest - редактирование заявки на проверку озвучки
     * 
     * необходима роль модератора или администратора. после редактирования, отредактированная запись по вебсокету отправляется пользователю из userId(создавшему заявку) в событие с названием "statuses"
     */
    'put'(
      parameters?: Parameters<Paths.AudioStoryRequestControllerEditAudioStoryRequest.PathParameters & Paths.AudioStoryRequestControllerEditAudioStoryRequest.HeaderParameters> | null,
      data?: Paths.AudioStoryRequestControllerEditAudioStoryRequest.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AudioStoryRequestControllerEditAudioStoryRequest.Responses.$200>
  }
  ['/api/audio-story-request/delete/{audioStoryRequestId}']: {
    /**
     * AudioStoryRequestController_deleteAudioStoryRequestBydId - удаление заявки на проверку озвучки
     * 
     * необходима роль администратора
     */
    'delete'(
      parameters?: Parameters<Paths.AudioStoryRequestControllerDeleteAudioStoryRequestBydId.PathParameters & Paths.AudioStoryRequestControllerDeleteAudioStoryRequestBydId.HeaderParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AudioStoryRequestControllerDeleteAudioStoryRequestBydId.Responses.$200>
  }
  ['/api/constituent/add']: {
    /**
     * ConstituentsController_addConstituent - добавление субъекта РФ
     * 
     * необходима роль администратора
     */
    'post'(
      parameters?: Parameters<Paths.ConstituentsControllerAddConstituent.HeaderParameters> | null,
      data?: Paths.ConstituentsControllerAddConstituent.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ConstituentsControllerAddConstituent.Responses.$200>
  }
  ['/api/constituent/add/ethnic-group']: {
    /**
     * ConstituentsController_addEthnicGroupToConstituent - добавление этнической группы к субъекту рф
     * 
     * небходима роль администратора
     */
    'post'(
      parameters?: Parameters<Paths.ConstituentsControllerAddEthnicGroupToConstituent.HeaderParameters> | null,
      data?: Paths.ConstituentsControllerAddEthnicGroupToConstituent.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ConstituentsControllerAddEthnicGroupToConstituent.Responses.$200>
  }
  ['/api/constituent/ethnic-group/delete']: {
    /**
     * ConstituentsController_deleteEthnicGroupFromConstituent - удаление этнической группы у субъекта рф
     * 
     * необходима роль администратора
     */
    'delete'(
      parameters?: Parameters<Paths.ConstituentsControllerDeleteEthnicGroupFromConstituent.HeaderParameters> | null,
      data?: Paths.ConstituentsControllerDeleteEthnicGroupFromConstituent.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ConstituentsControllerDeleteEthnicGroupFromConstituent.Responses.$200>
  }
  ['/api/constituent/ethnic-group/{constituentId}']: {
    /**
     * ConstituentsController_getEthnicGroupByConstituentId - получение этнической группы, принадлежащей субъекту рф
     */
    'get'(
      parameters?: Parameters<Paths.ConstituentsControllerGetEthnicGroupByConstituentId.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ConstituentsControllerGetEthnicGroupByConstituentId.Responses.$200>
  }
  ['/api/constituent/all']: {
    /**
     * ConstituentsController_getConstituents - получение всех субъектов
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ConstituentsControllerGetConstituents.Responses.$200>
  }
  ['/api/constituent/edit/{id}']: {
    /**
     * ConstituentsController_editConstituent - редактирование субъекта
     * 
     * небходима роль администратора
     */
    'put'(
      parameters?: Parameters<Paths.ConstituentsControllerEditConstituent.HeaderParameters> | null,
      data?: Paths.ConstituentsControllerEditConstituent.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ConstituentsControllerEditConstituent.Responses.$200>
  }
  ['/api/constituent/{id}']: {
    /**
     * ConstituentsController_deleteConstituentById - удаление данных субъекта
     * 
     * необходима роль администратора
     */
    'delete'(
      parameters?: Parameters<Paths.ConstituentsControllerDeleteConstituentById.PathParameters & Paths.ConstituentsControllerDeleteConstituentById.HeaderParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ConstituentsControllerDeleteConstituentById.Responses.$200>
  }
  ['/api/ethnic-group/add']: {
    /**
     * EthnicGroupController_addEthnicGroup - добавление этнической группы
     * 
     * необходима роль администратора
     */
    'post'(
      parameters?: Parameters<Paths.EthnicGroupControllerAddEthnicGroup.HeaderParameters> | null,
      data?: Paths.EthnicGroupControllerAddEthnicGroup.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.EthnicGroupControllerAddEthnicGroup.Responses.$200>
  }
  ['/api/ethnic-group/all']: {
    /**
     * EthnicGroupController_ethnicGroups - получение списка этнических групп
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.EthnicGroupControllerEthnicGroups.Responses.$200>
  }
  ['/api/ethnic-group/{ethnicGroupId}']: {
    /**
     * EthnicGroupController_getEthnicGroupById - получение этнической группы по ethnicGroupId
     */
    'get'(
      parameters?: Parameters<Paths.EthnicGroupControllerGetEthnicGroupById.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.EthnicGroupControllerGetEthnicGroupById.Responses.$200>
  }
  ['/api/ethnic-group/edit/{id}']: {
    /**
     * EthnicGroupController_editEthnicGroup - редактирование этнической группы
     * 
     * необходима роль администратора
     */
    'put'(
      parameters?: Parameters<Paths.EthnicGroupControllerEditEthnicGroup.PathParameters & Paths.EthnicGroupControllerEditEthnicGroup.HeaderParameters> | null,
      data?: Paths.EthnicGroupControllerEditEthnicGroup.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.EthnicGroupControllerEditEthnicGroup.Responses.$200>
  }
  ['/api/ethnic-group/{id}']: {
    /**
     * EthnicGroupController_deleteEthnicGroup - удаление этнической группы
     * 
     * необходима роль администратора
     */
    'delete'(
      parameters?: Parameters<Paths.EthnicGroupControllerDeleteEthnicGroup.PathParameters & Paths.EthnicGroupControllerDeleteEthnicGroup.HeaderParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.EthnicGroupControllerDeleteEthnicGroup.Responses.$200>
  }
  ['/api/ethnic-group/language/add']: {
    /**
     * EthnicGroupController_addLanguage - добавление языка этнической группы
     * 
     * необходима роль администратора
     */
    'post'(
      parameters?: Parameters<Paths.EthnicGroupControllerAddLanguage.HeaderParameters> | null,
      data?: Paths.EthnicGroupControllerAddLanguage.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.EthnicGroupControllerAddLanguage.Responses.$200>
  }
  ['/api/ethnic-group/language/all']: {
    /**
     * EthnicGroupController_getAllLanguage - получение списка всех языков
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.EthnicGroupControllerGetAllLanguage.Responses.$200>
  }
  ['/api/ethnic-group/language/{id}']: {
    /**
     * EthnicGroupController_deleteLanguageById - удаление языка по id
     * 
     * необходима роль администратора
     */
    'delete'(
      parameters?: Parameters<Paths.EthnicGroupControllerDeleteLanguageById.PathParameters & Paths.EthnicGroupControllerDeleteLanguageById.HeaderParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.EthnicGroupControllerDeleteLanguageById.Responses.$200>
  }
  ['/api/map']: {
    /**
     * MapController_getMapTopojson - получить данные для отрисовки карты
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.MapControllerGetMapTopojson.Responses.$200>
  }
  ['/api/map/ethnic-groups']: {
    /**
     * MapController_getEthnicalGroupPoints - получение точек этнических групп на карте
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.MapControllerGetEthnicalGroupPoints.Responses.$200>
  }
  ['/api/map/ethnic-groups/{constituentId}']: {
    /**
     * MapController_getEthnicalGroupPointsByConstituentId - получение точек этнических групп по номеру региона
     */
    'get'(
      parameters?: Parameters<Paths.MapControllerGetEthnicalGroupPointsByConstituentId.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.MapControllerGetEthnicalGroupPointsByConstituentId.Responses.$200>
  }
  ['/api/map/ethnic-groups/{name}']: {
    /**
     * MapController_getEthnicGroupPointsByName - получение точек этнических групп по названию этнической группы
     */
    'get'(
      parameters?: Parameters<Paths.MapControllerGetEthnicGroupPointsByName.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.MapControllerGetEthnicGroupPointsByName.Responses.$200>
  }
  ['/api/map/ethnic-groups/{pointId}']: {
    /**
     * MapController_deleteEthnicalGroupPoint - удаление точки этнической группы
     * 
     * необходима роль администратора
     */
    'delete'(
      parameters?: Parameters<Paths.MapControllerDeleteEthnicalGroupPoint.PathParameters & Paths.MapControllerDeleteEthnicalGroupPoint.HeaderParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.MapControllerDeleteEthnicalGroupPoint.Responses.$200>
  }
  ['/api/map/constituents/filled']: {
    /**
     * MapController_getPercentsFilledStoriesByConstituentId - получение списка субъектов и их заполненности озвучками
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.MapControllerGetPercentsFilledStoriesByConstituentId.Responses.$200>
  }
  ['/api/request/status']: {
    /**
     * RequestController_getStatuses - получение существующих статусов для заявок
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RequestControllerGetStatuses.Responses.$200>
  }
  ['/api/request/type']: {
    /**
     * RequestController_getTypes - получение существующих типов заявок
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RequestControllerGetTypes.Responses.$200>
  }
  ['/api/add-story-request/all']: {
    /**
     * AddStoryRequestController_getAddStoryRequestAll - получение всех заявок на добавление сказки
     * 
     * необходима роль администратора. пример запроса: /api/add-story-request/all?start=1&count=10
     */
    'get'(
      parameters?: Parameters<Paths.AddStoryRequestControllerGetAddStoryRequestAll.QueryParameters & Paths.AddStoryRequestControllerGetAddStoryRequestAll.HeaderParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AddStoryRequestControllerGetAddStoryRequestAll.Responses.$200>
  }
  ['/api/add-story-request/my-requests']: {
    /**
     * AddStoryRequestController_getAddStoryRequestForCurrentUser - получение всех заявок на добавление сказки от текущего пользователя
     */
    'get'(
      parameters?: Parameters<Paths.AddStoryRequestControllerGetAddStoryRequestForCurrentUser.HeaderParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AddStoryRequestControllerGetAddStoryRequestForCurrentUser.Responses.$200>
  }
  ['/api/add-story-request/by-user/{userId}']: {
    /**
     * AddStoryRequestController_getAddStoryRequestByUserId - получение всех заявок на добавление сказки для выбранного пользователя
     * 
     * необходима роль администратора.
     */
    'get'(
      parameters?: Parameters<Paths.AddStoryRequestControllerGetAddStoryRequestByUserId.PathParameters & Paths.AddStoryRequestControllerGetAddStoryRequestByUserId.HeaderParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AddStoryRequestControllerGetAddStoryRequestByUserId.Responses.$200>
  }
  ['/api/add-story-request/create']: {
    /**
     * AddStoryRequestController_createAddStoryRequestForCurrentUser - создание заявки на добавление сказки
     */
    'post'(
      parameters?: Parameters<Paths.AddStoryRequestControllerCreateAddStoryRequestForCurrentUser.HeaderParameters> | null,
      data?: Paths.AddStoryRequestControllerCreateAddStoryRequestForCurrentUser.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AddStoryRequestControllerCreateAddStoryRequestForCurrentUser.Responses.$200>
  }
  ['/api/add-story-request/edit/{addStoryRequestId}']: {
    /**
     * AddStoryRequestController_editStatusAddStoryReqeust - обновление заявки
     * 
     * необходима роль администратора. статус заявки берется из /api/request/status/all | Необходима роль moder | После успешного редактирования данные заявки так же передаются пользователю с userId по веб-сокету
     */
    'put'(
      parameters?: Parameters<Paths.AddStoryRequestControllerEditStatusAddStoryReqeust.PathParameters & Paths.AddStoryRequestControllerEditStatusAddStoryReqeust.HeaderParameters> | null,
      data?: Paths.AddStoryRequestControllerEditStatusAddStoryReqeust.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AddStoryRequestControllerEditStatusAddStoryReqeust.Responses.$200>
  }
  ['/api/add-story-request/delete/{addStoryRequestId}']: {
    /**
     * AddStoryRequestController_deleteAddStoryRequestById - удаление заявки
     * 
     * Необходима роль администратора
     */
    'delete'(
      parameters?: Parameters<Paths.AddStoryRequestControllerDeleteAddStoryRequestById.PathParameters & Paths.AddStoryRequestControllerDeleteAddStoryRequestById.HeaderParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AddStoryRequestControllerDeleteAddStoryRequestById.Responses.$200>
  }
  ['/api/admin/ethnic-groups/{ethnicGroupId}/constituents/{constituentId}']: {
    /**
     * AdminController_addEthnicalGroupPoint - добавление точки этнической группы на карту
     * 
     * необходима роль администратора
     */
    'post'(
      parameters?: Parameters<Paths.AdminControllerAddEthnicalGroupPoint.PathParameters & Paths.AdminControllerAddEthnicalGroupPoint.HeaderParameters> | null,
      data?: Paths.AdminControllerAddEthnicalGroupPoint.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AdminControllerAddEthnicalGroupPoint.Responses.$200>
  }
  ['/api/admin/ethnic-groups/{pointId}']: {
    /**
     * AdminController_deleteEthnicalGroupPoint - удаление точки этнической группы
     * 
     * необходима роль администратора
     */
    'delete'(
      parameters?: Parameters<Paths.AdminControllerDeleteEthnicalGroupPoint.PathParameters & Paths.AdminControllerDeleteEthnicalGroupPoint.HeaderParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AdminControllerDeleteEthnicalGroupPoint.Responses.$200>
  }
  ['/api/admin/story/add']: {
    /**
     * AdminController_addStory - добавление сказки
     */
    'post'(
      parameters?: Parameters<Paths.AdminControllerAddStory.HeaderParameters> | null,
      data?: Paths.AdminControllerAddStory.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AdminControllerAddStory.Responses.$200>
  }
  ['/api/admin/story/edit/{storyId}']: {
    /**
     * AdminController_editSotry - редактирование сказки
     */
    'put'(
      parameters?: Parameters<Paths.AdminControllerEditSotry.PathParameters & Paths.AdminControllerEditSotry.HeaderParameters> | null,
      data?: Paths.AdminControllerEditSotry.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AdminControllerEditSotry.Responses.$200>
  }
  ['/api/admin/story/delete/{storyId}']: {
    /**
     * AdminController_deleteStoryById - удаление сказки
     */
    'delete'(
      parameters?: Parameters<Paths.AdminControllerDeleteStoryById.PathParameters & Paths.AdminControllerDeleteStoryById.HeaderParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AdminControllerDeleteStoryById.Responses.$200>
  }
  ['/api/admin/story/text/add/{storyId}']: {
    /**
     * AdminController_addTextStory - добавление текста сказки
     */
    'post'(
      parameters?: Parameters<Paths.AdminControllerAddTextStory.HeaderParameters> | null,
      data?: Paths.AdminControllerAddTextStory.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AdminControllerAddTextStory.Responses.$200>
  }
  ['/api/admin/story/{storyId}/audio']: {
    /**
     * AdminController_setUserAudioToStory - добавление озвучки к сказке
     */
    'post'(
      parameters?: Parameters<Paths.AdminControllerSetUserAudioToStory.PathParameters & Paths.AdminControllerSetUserAudioToStory.HeaderParameters> | null,
      data?: Paths.AdminControllerSetUserAudioToStory.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AdminControllerSetUserAudioToStory.Responses.$200>
  }
  ['/api/admin/story/{storyId}/language/{languageId}/audio/upload']: {
    /**
     * AdminController_uploadAudioStory - загрузка озвучки для сказки
     */
    'post'(
      parameters?: Parameters<Paths.AdminControllerUploadAudioStory.PathParameters & Paths.AdminControllerUploadAudioStory.HeaderParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AdminControllerUploadAudioStory.Responses.$200>
  }
  ['/api/admin/story/{storyId}/image/upload']: {
    /**
     * AdminController_uploadStoryImage - загрузка обложки для выбранной сказки
     */
    'post'(
      parameters?: Parameters<Paths.AdminControllerUploadStoryImage.PathParameters & Paths.AdminControllerUploadStoryImage.HeaderParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AdminControllerUploadStoryImage.Responses.$200>
  }
  ['/api/admin/story/{storyId}/image']: {
    /**
     * AdminController_deleteStoryImgByStoryId - удаление обложки для выбранной сказки
     */
    'delete'(
      parameters?: Parameters<Paths.AdminControllerDeleteStoryImgByStoryId.PathParameters & Paths.AdminControllerDeleteStoryImgByStoryId.HeaderParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AdminControllerDeleteStoryImgByStoryId.Responses.$200>
  }
  ['/api/admin/audio//delete/{userAudioId}']: {
    /**
     * AdminController_deleteUserAudioById - удаление озвучки пользователя
     * 
     * необходима роль администратора
     */
    'delete'(
      parameters?: Parameters<Paths.AdminControllerDeleteUserAudioById.PathParameters & Paths.AdminControllerDeleteUserAudioById.HeaderParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AdminControllerDeleteUserAudioById.Responses.$200>
  }
  ['/api/admin/user/delete/{userId}']: {
    /**
     * AdminController_deleteUser - удаление пользователя по его id
     * 
     * необходима роль администратора
     */
    'delete'(
      parameters?: Parameters<Paths.AdminControllerDeleteUser.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AdminControllerDeleteUser.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>
