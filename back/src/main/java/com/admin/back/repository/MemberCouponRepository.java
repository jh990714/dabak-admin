package com.admin.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.admin.back.entity.MemberCouponEntity;
import com.admin.back.entity.MemberEntity;

public interface MemberCouponRepository extends JpaRepository<MemberCouponEntity, Long>{

    void deleteByMember(MemberEntity memberEntity);
    
}