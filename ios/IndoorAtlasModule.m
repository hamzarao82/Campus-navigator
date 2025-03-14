#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(IndoorAtlasModule, RCTEventEmitter)

RCT_EXTERN_METHOD(startPositioning)
RCT_EXTERN_METHOD(stopPositioning)
RCT_EXTERN_METHOD(getCurrentLocation: (RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

@end
