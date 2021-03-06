import {Icon, Marker} from 'leaflet';
import {Offer} from '../../types/offer';
import {useRef, useEffect, memo} from 'react';
import useMap from '../../hooks/useMap';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT, MapClasses} from '../../consts';
import {useAppSelector} from '../../hooks';
import {getOffers} from '../../store/appData/selector';

type MapProps = {
  className: MapClasses;
  mapStyle?: {width: string, margin: string};
  city: string;
  points: Offer[];
  activeOffer: Offer | null;
}

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

function Map({className, city, points, activeOffer, mapStyle}: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const offers = useAppSelector(getOffers);
  const map = useMap(mapRef, city, offers);

  useEffect(() => {

    if (map) {
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.location.latitude,
          lng: point.location.longitude,
        });

        marker.setIcon(
          activeOffer !== null && point.id === activeOffer.id
            ? currentCustomIcon
            : defaultCustomIcon)
          .addTo(map);
      });
    }

  }, [map, points, activeOffer]);

  return (
    <section ref={mapRef} className={`${className} map`} style={mapStyle} data-testid="map"/>
  );
}

export default memo(Map) ;
