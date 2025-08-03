import React, { useState, useEffect } from "react";
import { optimizeImage } from "../utils/imageOptimizer";
import placeholder from "../assets/placeholder.png";
import PropTypes from "prop-types";

/**
 * OptimizedImage
 *
 * Kullanıcının yüklediği veya modelin belirlediği görseli,
 * responsive, lazy-loaded ve performanslı bir şekilde sunar.
 *
 * - Küçük dosya boyutu için optimize eder.
 * - `src` boşsa placeholder gösterir.
 * - Başarısız yüklemelerde fallback sağlar.
 */
const OptimizedImage = ({
  src,
  alt = "ürün görseli",
  className = "",
  width = 300,
  height = 300,
  lazy = true,
  rounded = true,
}) => {
  const [optimizedSrc, setOptimizedSrc] = useState("");
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const process = async () => {
      if (!src) {
        setOptimizedSrc(placeholder);
        return;
      }

      try {
        const optimized = await optimizeImage(src, width, height);
        if (isMounted) setOptimizedSrc(optimized);
      } catch (err) {
        console.warn("Görsel optimize edilemedi:", err);
        setHasError(true);
      }
    };

    process();

    return () => {
      isMounted = false;
    };
  }, [src, width, height]);

  const imageClass = `
    object-cover 
    ${rounded ? "rounded-xl" : ""}
    shadow-md 
    transition-opacity 
    duration-300 
    ${className}
  `;

  return (
    <img
      src={hasError ? placeholder : optimizedSrc}
      alt={alt}
      width={width}
      height={height}
      loading={lazy ? "lazy" : "eager"}
      className={imageClass}
      onError={() => {
        console.warn("Görsel yüklenemedi, placeholder'a geçiliyor.");
        setHasError(true);
      }}
    />
  );
};

OptimizedImage.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  lazy: PropTypes.bool,
  rounded: PropTypes.bool,
};

export default OptimizedImage;
